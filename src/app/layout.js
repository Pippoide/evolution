import "./globals.css";

import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react"


export const metadata = {
  title: "Design Epoque",
  description: " Vai al tuo lavoro di commesso tipografo e fai scorrere le tue dita a sinistra o a destra, rispondendo ai clienti. Modifica l’andamento della storia della grafica e cerca di scoprire la sua fine…",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className=" flex justify-center items-center w-full bg-third h-dvh sm:h-screen">
        {children}
        <Analytics />
        </body>
    </html>
  );
}
