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
        <div className="w-full h-screen bg-third flex justify-center p-12 md:px-0">
            <div className="w-full md:w-2/5 ">
                <div className="mb-6 md:mb-12 text-secondary ">
                    <h1 className="font-alfa text-secondary md:text-6xl ">Classifica</h1>
                    <p className="text-secondary text-xs md:text-lg">
                        Qui sono presenti le geste eroiche ti tutti i giocatori che sono riusciti a lasciare un segno nella storia della grafica
                        </p>
                </div>

                <div className=" bg-secondary text-third">
                    <div className="grid grid-cols-9 text-secondary font-alfa bg-red-500 bg-primary p-2 md:py-4 text-xs md:text-xl">
                        <div className="col-span-2">Rank</div>
                        <div className="col-span-5 text-center">Nickname</div>
                        <div className="col-span-2 text-right">Score</div>
                    </div>
                    <div className="grid grid-cols-1 w-full max-h-[50vh] overflow-y-auto ">
                        {rows.map((rows, index) => {
                            return (
                                <div className="grid grid-cols-9 border-b-2 p-2 text-xs md:text-lg  " key={index}>
                                    <h1 className="col-span-2 py-1 ">{index + 1}th</h1>
                                    <h1 className="col-span-5 py-1 text-center ">{rows.name}</h1>
                                    <h1 className="col-span-2 py-1 text-right ">{rows.score}</h1>

                                </div>)
                        })}
                    </div>
                </div>


            </div>
        </div>
    )
}