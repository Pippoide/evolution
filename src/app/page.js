import Link from "next/link"
import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT * from leadboard order by score desc`;

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
              <h1>{index+1}</h1>
              <h1>{rows.nome_giocatore}</h1>
              <h1>{rows.score}</h1>
            </div>)
        })}
      </div>
    </div>
  )
}