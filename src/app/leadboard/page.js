async function getData() {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/leadboard?${Date.now()}`, {
            method: "GET",
            cache: 'default',
            next: { tags: ['leadboard'] }
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error };
    }
}
const rows = await getData();

export default function Leadboard() {


    return (
        <div className="w-full h-screen bg-third flex justify-center py-12">
            <div className="w-full md:w-2/5 bg-secondary text-third ">
                <div className="grid grid-cols-9 text-secondary font-alfa bg-red-500 bg-primary p-2 md:py-4 text-xs md:text-xl">
                    <div className="col-span-2">Rank</div>
                    <div className="col-span-5 text-center">Nickname</div>
                    <div className="col-span-2 text-right">Score</div>
                </div>
                <div className="grid grid-cols-1 w-full max-h-[50vh] overflow-y-auto ">
                    {rows.map((rows, index) => {
                        return (
                            <div className="grid grid-cols-9 border-b-2 p-2   " key={index}>
                                <h1 className="col-span-2 py-1 ">{index + 1}th</h1>
                                <h1 className="col-span-5 py-1 text-center ">{rows.name}</h1>
                                <h1 className="col-span-2 py-1 text-right ">{rows.score}</h1>

                            </div>)
                    })}
                </div>

            </div>
        </div>
    )
}