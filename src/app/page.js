import Link from "next/link"
import Footer from "./footer"




export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <div className="h-full text-secondary bg-third w-screen flex flex-col justify-around items-center p-12 md:p-6">
        <div className="w-full md:w-1/3 flex justify-center flex-col">
          <img className="w-full" src="Logo.svg" alt="logo" />
          <div className="h-3/5 flex flex-col justify-center items-center my-6 md:my-3">
            <div className="flex flex-col space-y-4 my-6 md:my-12">
              <img className="w-full" src="cardHome.png" />
              <p className="text-sm md:text-base lg:text-lg w.full text-center mb-6 inline-block">
                Vai al tuo lavoro di commesso tipografo e fai scorrere le tue dita a sinistra o a destra, rispondendo cortesemente ai clienti. Modifica l’andamento della storia della grafica e cerca di scoprire la sua fine…
              </p>
            </div>
            <div className="grid w-full grid-rows-3 text-center gap-2">
              <Link href="/game" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Gioca</Link>
              <Link href="/history" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Cronologia</Link>
              <Link href="/leadboard" className="bg-red-50 px-4 py-2 bg-primary hover:bg-primary-light hover:text-third transition-all ease-out duration-300">Classifica</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}