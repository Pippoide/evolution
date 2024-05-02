import Link from "next/link"

async function getData() {
  try {
    const res = await fetch('http://localhost:3000/api/leadboard');

    console.log(res)
    const data = await res.json();
    console.log(data)
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

export default async function Home() {
  const data = await getData()
  console.log(data)
  const rows = data.result.rows

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h1>Scopri quanto ne sai della storia sulla grafica</h1>
      <Link href="/game" className="bg-red-50 px-4 py-2">gioca</Link>
      <div>
        <div className="flex justify-between">
          <h1>posizione</h1>
          <h1>nickname</h1>
          <h1>score</h1>
        </div>
        {rows.map((rows, index) => {
          return (
            <div className="flex justify-between" key={index}>
              <h1>{index + 1}</h1>
              <h1>{rows.nome_giocatore}</h1>
              <h1>{rows.score}</h1>
            </div>)
        })}
      </div>
    </div>
  )
}


