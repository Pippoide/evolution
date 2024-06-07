import Link from "next/link"


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


export default async function Home() {
  const rows = await getData();
  return (
    <div className="h-screen bg-green-500 w-screen flex flex-col justify-center items-center">
      <h1 className="text-xl">Scopri quanto ne sai della storia sulla grafica</h1>
      <Link href="/game" className="bg-red-50 px-4 py-2 ">Gioca</Link>
      <div className="w-full md:w-1/3">
        <div className="grid grid-cols-9  bg-red-500 ">
          <div className="col-span-2">rank</div>
          <div className="col-span-5">nickname</div>
          <div className="col-span-2">score</div>
        </div>
        <div className="grid grid-cols-1 w-full">
          {rows.map((rows, index) => {
            return (
              <div className="grid grid-cols-9  " key={index}>
                <h1 className="col-span-2">{index + 1}</h1>
                <h1 className="col-span-5">{rows.name}</h1>
                <h1 className="col-span-2">{rows.score}</h1>
              </div>)
          })}
        </div>

      </div>
    </div>
  )
}


