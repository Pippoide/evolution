'use client'
import { useState } from "react";
import HomeButton from "../homeButton.js"

export default function History(){
    const [contatoreMazzo, setContatoreMazzo] = useState(0);
    const [contatoreCarta, setContatoreCarta] = useState(0);
    const decks = require("../../deck.json")
    const mazzo = decks.deck[contatoreMazzo];
    const deckLength = decks.deck.length; //Totale Mazzi presenti nel Deck
    const mazzoLength = mazzo.carta.length; //Totale carte nel mazzo
    const carta = mazzo.carta[contatoreCarta];

    return(
        <div className="w-full min-h-screen md:h-screen p-12 flex bg-secondary flex-col">
            <div className="w-full flex flex-col font-custom mb-12">
                <HomeButton/>
                <h1 className="text-3xl">CRONOLOGIA</h1>
                <p>qui sono presenti tutte le carte, più rilevanti che hanno formato la storia della grafica</p>
            </div>
            <div className="w-full h-auto md:h-[30%] flex flex-col md:flex-row items-center overflow-auto space-y-3 md:space-y-0 md:space-x-3">
            {mazzo.carta.filter((carta) => carta.important).map((carta,index)=>{
            return (
            <div key={index}  className="h-[18rem] md:h-full w-min rounded-3xl flex flex-col space-y-2"> 
                <p className="font-custom w-full text-center bg-primary-light text-secondary rounded-full ">{carta.anno}</p>
                <div className='overflow-auto h-full p-2 flex-col rounded-xl  bg-primary-light '>
                    <img className='point-event-none bg-cover' sizes='100vw, 30vw' src={carta.flipImg}></img>
                    <p className='w-full h-full py-6 font-custom '>
                        {carta.flipDescrizione}
                    </p>
                </div>
               
            </div>
            )
           })}
            </div>
        </div>
    )
}