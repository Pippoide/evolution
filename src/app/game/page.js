'use client'

import { motion, useDragControls, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import actionRevalidateTag from "../actions";
export default function Game() {

  const decks = require("../../deck.json")
  const deckDeath = require("../../deathDeck.json")
  const router = useRouter()

  //IndicatoriGioco
  const [indicatoreProgresso, setIndicatoreProgresso] = useState(50);
  const [indicatoreEtica, setIndicatoreEtica] = useState(50);
  const [indicatorePopolo, setIndicatorePopolo] = useState(50);
  //variabili di Mazzo
  const [contatoreMazzo, setContatoreMazzo] = useState(0);
  const [contatoreCarta, setContatoreCarta] = useState(0);
  //variabile di vittoria
  const [statusGioco, setStatusGioco] = useState(false);
  const [animationNewCard, setAnimationNewCard] = useState(true)
  const [score, setScore] = useState(0)
  const [nomeGiocatore, setNomeGiocatore] = useState('')

  /** variabili Deck */
  const mazzo = decks.deck[contatoreMazzo];
  const deckLength = decks.deck.length; //Totale Mazzi presenti nel Deck
  const mazzoLength = mazzo.carta.length; //Totale carte nel mazzo
  const carta = mazzo.carta[contatoreCarta];


  /** variabili Morte*/
  const mazzoMorte = deckDeath.deck[contatoreMazzo + 1];
  const [cartaMorte, setCartaMorte] = useState(mazzoMorte.indicatore);

  const controls = useDragControls()
  const x = useMotionValue(0);


  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0.8, 1, 1, 1, 0.8]);
  const scale = useTransform(x, [-200, 0, 200], [1, 1, 1]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const textOpacityLeft = useTransform(x, [0, -50], [0, 1]);
  const textOpacityRight = useTransform(x, [0, 50], [0, 1]);


  useEffect(() => {
    // Dopo che lo stato è stato effettivamente aggiornato, esegui checkIndicatore
    checkIndicatore();
  }, [indicatoreEtica, indicatorePopolo, indicatoreProgresso]);


  useEffect(() => {
    setAnimationNewCard(true)
    console.log("inizio animazione")

  }, [contatoreMazzo])

  const checkIndicatore = () => {
    //console.warn("CheckIndicatore() => controllo valori in corso...")
    if (
      (indicatoreEtica >= 100 || indicatoreEtica <= 0) ||
      (indicatorePopolo >= 100 || indicatorePopolo <= 0) ||
      (indicatoreProgresso >= 100 || indicatoreProgresso <= 0)
    ) {
      setStatusGioco(true);
      if (indicatoreEtica >= 100 || indicatoreEtica <= 0) {
        setStatusGioco(true);
        setCartaMorte(prev => prev.etica)
      }
    }
    else {
      console.log("Partita in corso")
    }
    return 0
  }

  const changeIndicatore = (direzione) => {
    //direzione booleano, True = destra, False = sinistra
    //SWIPE A DESTRA
    if (direzione) {
      const indexEtica = carta.indicatore.etica.destra;
      const indexPopolo = carta.indicatore.popolo.destra;
      const indexProgresso = carta.indicatore.progresso.destra;
      setIndicatoreEtica(prevEtica => prevEtica + indexEtica)
      setIndicatoreProgresso(prevProgresso => prevProgresso + indexProgresso)
      setIndicatorePopolo(prevPopolo => prevPopolo + indexPopolo)
    }
    //SWIPE A SINISTRA
    else {
      const indexEtica = carta.indicatore.etica.sinistra;
      const indexPopolo = carta.indicatore.popolo.sinistra;
      const indexProgresso = carta.indicatore.progresso.sinistra;
      setIndicatoreEtica(prevEtica => prevEtica + indexEtica)
      setIndicatorePopolo(prevPopolo => prevPopolo + indexPopolo)
      setIndicatoreProgresso(prevProgresso => prevProgresso + indexProgresso)
    }
  }

  const handleDragEnd = (event, info) => {
    setScore(prev => prev + 1)
    if (!carta?.evento) {
      if (info.offset.x > 100) {
        changeIndicatore(true)
        // Esegui azione di swipe a destra
        //
        if (carta?.skipCarteDirection == true) {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //nuova carta skippata
          console.log(contatoreCarta)
        }
        else {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1) //nuova carta
        }
        checkNextCarta()
        console.log("Swipe a destra!");
      } else if (info.offset.x < -100) {
        changeIndicatore(false)
        //
        if (carta?.skipCarteDirection == false) {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //nuova carta skippata
        } else {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1)
        }
        checkNextCarta()
        //nuova carta
        // Esegui azione di swipe a sinistra
        console.log("Swipe a sinistra!");
      }
      // Resetta la posizione del div
      x.set(0);
    } else {
      console.log("carta evneto")
      if (carta?.skipCarteDirection == false) {
        setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //nuova carta skippata
      }
      else {
        setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1) //nuova carta
      }
      checkNextCarta()
    }

  };

  const checkNextCarta = () => {
    if (contatoreCarta >= mazzoLength - 1) {
      setContatoreCarta(0) //resetta la carta
      if (contatoreMazzo < deckLength - 1) {
        setContatoreMazzo(prevMazzo => prevMazzo + 1)
      } //vai al prossimo mazzo
      else {
        console.log("hai vinto")
      }
    }
  }

  async function insertData() {
    try {
      const res = await fetch(`http://localhost:3000/api/leadboard`,
        {
          method: "POST",
          body: JSON.stringify({ name: nomeGiocatore, score }),
          next: { tags: ['leadboard'] }
        });
      await actionRevalidateTag('leadboard')
      return await res.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }
  //animazione nuove mazzo
  const handleAnimationComplete = (x) => {
    setTimeout(() => {
      console.log("L'animazione è terminata!");
      setAnimationNewCard(false)
    }, 1500); // Sostituisci 1000 con la durata dell'animazione più il ritardo
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="sm:w-1/3 w-full min-h-screen bg-red-50 p-5 relative flex flex-col justify-between">  {/**column */}
        {statusGioco ? (
          <div className="p-2 bg-red-500 absolute w-min h-min z-50 flex  inset-0  flex-col mx-auto my-auto">
            <form className="flex flex-col" onSubmit={async (event) => {
              event.preventDefault();
              try {
                const response = await insertData();
                console.log('before push:', response)
                router.push('/')
              } catch (err) {
                console.error(err);
              }
            }}>
              <h1>Assurdo eri cosi vicino</h1>
              <input type="text" placeholder="nickname" minLength={3} value={nomeGiocatore} onChange={(e) => setNomeGiocatore(e.target.value)}></input>
              <button type="submit">Resta nella storia</button>
            </form>
          </div>) : ""}
        {/**icons */}
        <div className="w-full flex flex-row justify-evenly items-center">
          <div className="w-10 h-10 relative flex flex-col">
            <Image alt="asd" src="/bilancia.svg" fill className="point-event-none" draggable="false"></Image>
            <span>{indicatoreEtica}</span>
          </div>
          <div className="w-10 h-10 relative flex flex-col">
            <Image alt="asd" src="/scienza.svg" fill className="point-event-none" draggable="false"></Image>
            <span>{indicatoreProgresso}</span>
          </div>
          <div className="w-10 h-10 relative flex flex-col">
            <Image alt="asd" src="/persona.svg" fill className="point-event-none" draggable="false"></Image>
            <span>{indicatorePopolo}</span>
          </div>
        </div>
        {/**card */}
        {statusGioco ? (
          <div>
            <div className="w-full aspect-square relative z-10">
              <Image sizes="100vw, 100vw" alt="asd" src={cartaMorte.img} className=" point-event-none rounded-3xl z-0" draggable="false" fill 	></Image>
            </div>
          </div>) : (
          <div className="w-full aspect-square relative">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragControls={controls}
              onDragEnd={handleDragEnd}
              className="w-full aspect-square relative z-10"
              style={{
                x,
                opacity,
                scale,
                rotate
              }}
            >
              {/**animazione carte retro */}
              <div>
                {animationNewCard ? (
                  mazzo.carta.map((x, index) => { //matteo qui non va
                    return <motion.div
                      className="w-full rounded-3xl aspect-square absolute bg-red-600"
                      key={index}
                      initial={{ opacity: 0, y: -100 }}
                      exit={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                      onAnimationComplete={index == (mazzo.carta.length - 1) ? handleAnimationComplete(index) : ""}
                    >
                      <Image sizes="100vw, 100vw" alt="asd" src="/Abstract Blue Carte Da Gioco Texture.jpg" className="point-event-none rounded-3xl " draggable="false" fill	></Image>
                    </motion.div>
                  })) : ("")}

              </div>
              {/** carte */}
              <div className="w-full aspect-square relative ">
                {!carta.testoDestra ? ("") :
                  (<motion.h1 className="text-3xl z-10 cursor-pointer-none  absolute right-0 p-5 " style={{ opacity: textOpacityRight }}>{carta.testoDestra}</motion.h1>)}
                {!carta.testoSinistra ? ("") :
                  (<motion.h1 className="text-3xl z-10 cursor-pointer-none absolute left-0 p-5" style={{ opacity: textOpacityLeft }}>{carta.testoSinistra}</motion.h1>)}
                <Image sizes="100vw, 100vw" alt="asd" src={carta.img} className=" point-event-none rounded-3xl z-0" draggable="false" fill 	></Image>
              </div>
            </motion.div>
            {/**carta fissa retro */}
            <div className="w-full aspect-square absolute top-0 z-0">
              <div className="w-full aspect-square relative">
                <Image sizes="100vw, 100vw" alt="asd" src="/Abstract Blue Carte Da Gioco Texture.jpg" className="point-event-none rounded-3xl " draggable="false" fill	></Image>
              </div>
            </div>
          </div>)}
        {/**text */}
        <div className="w-full flex flex-col text-center">
          <h1>{carta.titolo}</h1>
          <p>{carta.descrizione}</p>
        </div>
      </div>
    </main>
  );
}

