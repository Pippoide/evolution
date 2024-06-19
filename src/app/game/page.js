'use client'
import '../globals.css'


import { motion, useDragControls, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import actionRevalidateTag from "../actions";
import IconProgress from "../iconProgress";
import IconEtica from "../iconEtica";
import IconPopolo from '../iconPopolo';
import DotAdvice from '../dotAdvice';
import { Container } from 'postcss';
import { useRef } from 'react';
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

  const [adviceProgresso, setAdviceProgresso] = useState(false);
  const [adviceEtica, setAdviceEtica] = useState(false);
  const [advicePopolo, setAdvicePopolo] = useState(false);


  /** variabili Deck */
  const mazzo = decks.deck[contatoreMazzo];
  const deckLength = decks.deck.length; //Totale Mazzi presenti nel Deck
  const mazzoLength = mazzo.carta.length; //Totale carte nel mazzo
  const carta = mazzo.carta[contatoreCarta];

  var cartaLength = 0 //totale carte di tutti i mazzi
  for (var i = 0; i < deckLength; i++) {
    cartaLength += decks.deck[i].carta.length
  }

  /** variabili Morte*/
  const mazzoMorte = deckDeath.deck[contatoreMazzo + 1];
  const [cartaMorte, setCartaMorte] = useState(mazzoMorte.indicatore);

  const controls = useDragControls()
  const x = useMotionValue(0);

  //flip carta
  const [flipped, setFlipped] = useState(false);
  const handleFlip = () => {
    setFlipped(!flipped);
  };



  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0.8, 1, 1, 1, 0.8]);
  const scale = useTransform(x, [-200, 0, 200], [1, 1, 1]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const textOpacityLeft = useTransform(x, [0, -50], [0, 1]);
  const textOpacityRight = useTransform(x, [0, 50], [0, 1]);


  useEffect(() => {
    // Dopo che lo stato è stato effettivamente aggiornato, esegui checkIndicatore
    checkIndicatore();
  }, [indicatoreEtica, indicatorePopolo, indicatoreProgresso]);

  //progress bar
  const incrementoSwiper = 100 / cartaLength;
  const [positionSwiper, setPositionSwiper] = useState(0)
  useEffect(() => {
    setPositionSwiper(score * incrementoSwiper);
  }, [score])


  useEffect(() => {
    setAnimationNewCard(true)
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

  //handledrag durante la carta è trascinata
  const handleDrag = (event, info) => {
    if (!carta?.evento) { //controllo non è evento, se è evento non ha cambi d'indicatore
      if (info.offset.x > 100) { //carta a destra
        if (carta.indicatore.etica.destra != 0) {
          setAdviceEtica(true)
        }
        else {
          setAdviceEtica(false)
        }
        if (carta.indicatore.popolo.destra != 0) {
          setAdvicePopolo(true)
        }
        else {
          setAdvicePopolo(false)
        }
        if (carta.indicatore.progresso.destra != 0) {
          setAdviceProgresso(true)
        }
        else {
          setAdviceProgresso(false)
        }
      }
      else {
        if (info.offset.x < -100) {
          if (carta.indicatore.etica.sinistra != 0) {
            setAdviceEtica(true)
          }
          else {
            setAdviceEtica(false)
          }
          if (carta.indicatore.popolo.sinistra != 0) {
            setAdvicePopolo(true)
          }
          else {
            setAdvicePopolo(false)
          }
          if (carta.indicatore.progresso.sinistra != 0) {
            setAdviceProgresso(true)
          }
          else {
            setAdviceProgresso(false)
          }
        }
      }
    }
    if (info.offset.x < 100 && info.offset.x > -100) {
      setAdviceEtica(false)
      setAdvicePopolo(false)
      setAdviceProgresso(false)
    }
  };

  const handleDragEnd = (event, info) => {
    console.log(info.offset.x)
    if (!carta?.evento) {
      if (info.offset.x > 100) {
        changeIndicatore(true)
        // Esegui azione di swipe a destra
        if (carta?.skipCarteDirection == 0 || carta?.skipCarteDirection == 2) //swipe a destra
        {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //carta skippata
          console.log("Contatore Carta " + contatoreCarta)
        }
        else {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1) //nuova carta
        }
        checkNextCarta()
        setScore(prev => prev + 1)
        console.log("Swipe a destra!");
      } else if (info.offset.x < -100) {
        changeIndicatore(false)
        //
        if (carta?.skipCarteDirection == 1 || carta?.skipCarteDirection == 2) {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //nuova carta skippata
        } else {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1)
        }
        checkNextCarta()
        setScore(prev => prev + 1)
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
      setScore(prev => prev + 1) //controllare se si riporta la carta evento al centro se conta lo score
    }

    setAdviceEtica(false)
    setAdvicePopolo(false)
    setAdviceProgresso(false)

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
  //console.log("sadad:",process.env.NEXT_PUBLIC_BACKEND_URL)

  async function insertData() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/leadboard`,
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
      setAnimationNewCard(false)
    }, 1500); // Sostituisci 1000 con la durata dell'animazione più il ritardo
  }

  const containerRef = useRef(null);
  const [titleHeight, setTitleHeight] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) { //se esiste l'elemento
        const containerHeight = containerRef.current.clientHeight; //altezza del div contenitore
        const cardHeight = containerRef.current.querySelector('.cardSpecial').clientHeight; //altezza della carta
        const remainingHeight = containerHeight - cardHeight; //altezza rimanente nel container
        const remainingHeightScale = ((100 * remainingHeight) / containerHeight);
        const titleHeight = remainingHeightScale * 0.30 // 25% for title
        const descriptionHeight = remainingHeightScale * 0.60; // 15% for description

        setTitleHeight(titleHeight);
        setDescriptionHeight(descriptionHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  })


  return (
    <main className="flex w-full h-full md:h-screen overflow-hidden flex-col items-center justify-center ">
      <div className="sm:w-1/3 w-full h-full overflow-hidden relative flex flex-col  bg-third ">  {/**column */}

        {/**form end gamea*/}
        {statusGioco ? (
          <div className="bg-primary absolute w-min h-min z-50 flex  inset-0  flex-col mx-auto my-auto">
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
        <div className="w-full h-min bg-primary px-6 py-3 md:py-6 md:px-12 flex flex-row justify-evenly items-center">
          <div className="w-6 h-11 md:w-10 md:h-16 items-center justify-between flex flex-col">
            <IconEtica progress={indicatoreEtica}> </IconEtica>
            <DotAdvice state={adviceEtica} />
          </div>
          <div className="w-6 h-11 md:w-10 md:h-16 items-center justify-between flex flex-col">
            <IconProgress progress={indicatoreProgresso}></IconProgress>
            <DotAdvice state={adviceProgresso} />
          </div>
          <div className="w-6 h-11 md:w-10 md:h-16 items-center justify-between flex flex-col">
            <IconPopolo progress={indicatorePopolo}></IconPopolo>
            <DotAdvice state={advicePopolo} />
          </div>
        </div>

        {/**card */}
        <div ref={containerRef} className='w-full h-full flex justify-between flex-col items-center py-3 px-12 md:px-16'>
          {/** titolo carta */}
          <div className="w-full flex flex-col justify-center items-center text-center font-custom" style={{ height: titleHeight + "%" }}>
            <h1 className='font-custom text-secondary text-3xl '>{carta.titolo}</h1>
          </div>

          {statusGioco ? (
            <div>
              <div className="w-full aspect-4/5 relative z-10 ">
                <Image sizes="100vw, 100vw" alt="asd" src={cartaMorte.img} className=" point-event-none rounded-3xl z-0" draggable="false" fill 	></Image>
              </div>
            </div>) : (
            <div className="w-full cardSpecial relative aspect-4/5 " onClick={handleFlip}>
              <div className="z-50 absolute w-full h-full transition-all ease-out duration-300"
                style={{ transformStyle: 'preserve-3d', transform: flipped ? "rotateY(180deg)" : "" }}>
                <div id='front' className=" absolute w-full h-full flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragControls={controls}
                    onDragEnd={handleDragEnd}
                    onDrag={handleDrag}
                    className="w-full aspect-4/5 relative z-10"
                    style={{
                      x,
                      scale,
                      rotate
                    }}
                  >
                    {/**animazione carte retro */}
                    <div>
                      {animationNewCard ? (
                        mazzo.carta.map((x, index) => { //matteo qui non va
                          return <motion.div
                            className="w-full rounded-3xl aspect-4/5 absolute "
                            key={index}
                            initial={{ opacity: 0, y: -100 }}
                            exit={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                            onAnimationComplete={index == (mazzo.carta.length - 1) ? handleAnimationComplete(index) : ""}
                          >
                            <Image sizes="100vw, 100vw" alt="carta sfondo" src="/Abstract Blue Carte Da Gioco Texture.jpg" className="point-event-none rounded-3xl " draggable="false" fill	></Image>
                          </motion.div>
                        })) : ("")}

                    </div>
                    {/** carta che scorre */}
                    <div className="w-full aspect-4/5 relative  ">
                      {!carta.testoDestra ? ("") :
                        (<motion.h1 className="text-xl h-1/4 font-custom w-full rounded-t-3xl z-10 text-secondary bg-black-opacity cursor-pointer-none text-right absolute right-0 p-5 " style={{ opacity: textOpacityRight }}>{carta.testoDestra}</motion.h1>)}
                      {!carta.testoSinistra ? ("") :
                        (<motion.h1 className="text-xl h-1/4 font-custom w-full rounded-t-3xl z-10 text-secondary bg-black-opacity cursor-pointer-none absolute text-left left-0 p-5" style={{ opacity: textOpacityLeft }}>{carta.testoSinistra}</motion.h1>)}
                      <Image sizes="100vw, 100vw" alt="carta image swipe" src={carta.img} className="point-event-none rounded-3xl z-0 bg-cover" draggable="false" fill 	></Image>
                    </div>
                  </motion.div>
                </div>
                <div id="back" className="absolute rounded-3xl w-full h-full bg-primary-light flex items-center justify-center rotate-y-180" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  CIAO
                </div>
              </div>

              {/**carta fissa retro */}
              <div className="w-full aspect-4/5 absolute top-0 left-0 z-0">
                <div className="w-full aspect-4/5 relative ">
                  <Image sizes="100vw, 100vw" alt="asd" src="/Abstract Blue Carte Da Gioco Texture.jpg" className="point-event-none rounded-3xl " draggable="false" fill	></Image>
                </div>
              </div>
            </div>)}

          {/** descrizione carta */}
          <div className="w-full flex flex-col text-center font-custom justify-center items-center " style={{ height: descriptionHeight + "%" }}>
            <p className='text-secondary text-lg !leading-5'> {carta.descrizione}</p>
          </div>

        </div>

        {/**progress bar */}
        <div className="w-full flex h-auto bg-primary font-custom justify-center items-center px-6 py-6 md:px-12">
          <div className='relative w-[80%] flex justify-center items-center '>
            <span className='w-full h-[3px] bg-secondary'></span>
            <span id="swiper" className='absolute w-[3px] h-[30px] bg-primary-light z-100' style={{ left: `${positionSwiper}%` }}></span>
            <span className='absolute w-[3px] h-[30px] bg-secondary left-0'></span>
            <span className='absolute w-[3px] h-[30px] bg-secondary right-0'></span>
          </div>
          <div className='w-[20%] flex justify-end text-xl font-custom text-secondary'>
            <span>1922</span>
          </div>
        </div>
      </div>
    </main>
  );
}

