import { Inter } from "next/font/google";
import "./globals.css";
import { Alfa_Slab_One } from "next/font/google";
import { Rubik } from "next/font/google";
import Head from 'next/head';


const inter = Inter({ subsets: ["latin"] });

const alfaSlab = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  variable: '--font-alfa'
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: '--font-rubik'
})

export const metadata = {
  title: "Design Epoque",
  description: " Vai al tuo lavoro di commesso tipografo e fai scorrere le tue dita a sinistra o a destra, rispondendo ai clienti. Modifica l’andamento della storia della grafica e cerca di scoprire la sua fine…",
  openGraph: {
    images: '/favicon.ico',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
       <Head>
          {/* Definisci qui la favicon */}
          <link rel="icon" href="/favicon.ico" />
          {/* Altri tag di testata, se necessario */}
        </Head>
      <body className={`${rubik.variable} ${alfaSlab.variable} font-sans flex justify-center items-center w-full bg-third  h-dvh sm:h-screen `}>{children}</body>
    </html> 
  );
}
