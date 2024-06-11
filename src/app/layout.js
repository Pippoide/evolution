import { Inter } from "next/font/google";
import "./globals.css";
import { Alfa_Slab_One } from "next/font/google";
import { Rubik } from "next/font/google";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} ${alfaSlab.variable} font-sans flex justify-center items-center w-full bg-third h-dvh `}>{children}</body>
    </html> 
  );
}
