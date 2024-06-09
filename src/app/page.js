import Link from "next/link"




export default async function Home() {
  return (
    <div className="h-screen text-secondary bg-third w-screen flex flex-col justify-around items-center p-12 md:p-6">
      <div className="w-full md:w-1/3 flex justify-center flex-col">
        <img className="w-full" src="Logo.svg" alt="logo" />
        <div className="h-3/5 flex flex-col justify-start my-6 md:my-12">
          <h1 className="text-xs md:text-lg w.full text-wrap mb-6 ">Prova a ripercorrere la storia della grafica nella vita di un commesso tipografo</h1>
          <div className="grid w-full grid-rows-3 text-center gap-2">
            <Link href="/game" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Gioca</Link>
            <Link href="/history" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Cronologia</Link>
            <Link href="/leadboard" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Classifica</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


