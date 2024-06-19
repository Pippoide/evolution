import Link from "next/link"
import Footer from "./footer"




export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full text-secondary bg-third w-screen flex flex-col justify-center items-center p-12 md:p-6">
        <div className="w-full h-full md:w-1/3 flex justify-between  items-center flex-col">
          <img className="w-full" src="Logo.svg" alt="logo" />
          <div className="flex flex-col space-y-6 justify-center items-center">
            <img width={"90%"} height={"90%"} src="cardHome.png" />
            <p className="text-sm font-custom md:text-base lg:text-lg w.full text-center  inline-block !leading-4">
              Vai al tuo lavoro di commesso tipografo e fai scorrere le tue dita
              a sinistra o a destra, rispondendo ai clienti. Modifica l’andamento
              della storia della grafica e cerca di scoprire la sua fine…
            </p>
          </div>
          <div className="grid w-2/3 grid-rows-3 gap-y-3 text-center gap-2">
            <Link href="/game" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300 rounded-xl">Gioca</Link>
            <Link href="/history" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300 rounded-xl">Cronologia</Link>
            <Link href="/leadboard" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300 rounded-xl">Classifica</Link>
          </div>
        </div>
      </div>
    
    </div>
  )
}