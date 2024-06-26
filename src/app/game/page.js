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
import { useRef } from 'react';
import Card from '../card';
export default function Game() {

  const decks = require("../../deck.json")
  const deckDeath = require("../../deathDeck.json")
  const router = useRouter()

  const containerRef = useRef(null);

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

  const [infoOffsetX, SetInfoOffsetX] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartTimeout = useRef(null);
  const fakeOneClick = useRef(null)

  useEffect(() => {
    console.log("Posizione di SpecialCard: ", infoOffsetX)
  }, [infoOffsetX])

  useEffect(() => {
    console.log(flipped)
  }, [flipped])



  /** variabili Deck */
  const mazzo = decks.deck[contatoreMazzo];
  const deckLength = decks.deck.length; //Totale Mazzi presenti nel Deck
  const mazzoLength = mazzo.carta.length; //Totale carte nel mazzo
  const carta = mazzo.carta[contatoreCarta];

  var cartaLength = 0 //totale carte di tutti i mazzi
  for (var i = 0; i < deckLength; i++) {
    cartaLength += decks.deck[i].carta.length
  }

  const [pathCarta, setPathCarta] = useState(carta.img)
  /**controllo del flip back sbagliato */

  useEffect(() => {
    console.log("contatoreCarta : " + contatoreCarta)
    //capire come tenere la stessa carta senza aggiornarla se uguale
    setPathCarta(carta.img + `?timestamp=${new Date().getTime()}`);

  }, [contatoreCarta])
  /** variabili Morte*/
  const mazzoMorte = deckDeath.deck[contatoreMazzo + 1];
  const [cartaMorte, setCartaMorte] = useState(mazzoMorte.indicatore);

  const controls = useDragControls()
  const x = useMotionValue(0);

  //flip carta
  const handleFlip = () => {
    console.log("OneClick partito")
    if (infoOffsetX == 0) {
      if (!isDragging) {
        setFlipped(!flipped)
      }
    }
  };

  const scale = useTransform(x, [-200, 0, 200], [1, 1, 1]);
  const rotate = useTransform(x, [-200, 0, 200], [-5, 0, 5]);
  const textOpacityLeft = useTransform(x, [0, -50], [0, 1]);
  const textOpacityRight = useTransform(x, [0, 50], [0, 1]);


  useEffect(() => {
    // Dopo che lo stato è stato effettivamente aggiornato, esegui checkIndicatore
    checkIndicatore();
  }, [indicatoreEtica, indicatorePopolo, indicatoreProgresso]);

  //progress bar
  //
  const incrementoSwiper = 100 / cartaLength;
  const [positionSwiper, setPositionSwiper] = useState(0)
  useEffect(() => {
    if (carta.id < 0) {
      setPositionSwiper((0) * incrementoSwiper);
    }
    else {
      setPositionSwiper((carta.id) * incrementoSwiper);
    }
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
      if (indicatorePopolo >= 100 || indicatorePopolo <= 0) {
        setStatusGioco(true);
        setCartaMorte(prev => prev.popolo)
      }
      if (indicatoreProgresso >= 100 || indicatoreProgresso <= 0) {
        setStatusGioco(true);
        setCartaMorte(prev => prev.progresso)
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


  const handleDragStart = () => {
    // Imposta il timeout per considerare l'inizio del drag dopo un breve ritardo
    dragStartTimeout.current = setTimeout(() => {
      setIsDragging(true);
    }, 100); // 100ms, modifica secondo necessità
  };

  //handledrag durante la carta è trascinata
  const handleDrag = (event, info) => {
    clearTimeout(dragStartTimeout.current);
    setIsDragging(false);
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
    SetInfoOffsetX(info.offset.x)
    setFlipped(false)
  }

  const handleSetScore = () => {
    console.log("nuova carta")
    if (carta.id >= 0) {
      setScore(prev => prev + 1);
    }
  }


  const handleDragEnd = (event, info) => {

    //pulizia se gia in corso un fakeOneClick
    if (fakeOneClick.current) {
      clearTimeout(fakeOneClick.current);
    }

    if (!carta?.evento) {
      if (info.offset.x > 100) { //carta trascinata a destra
        changeIndicatore(true)
        handleSetScore();
        // Esegui azione di swipe a destra
        if (carta?.skipCarteDirection == 0 || carta?.skipCarteDirection == 2) //swipe a destra 0(entrambi i lati) 2(se scegli di andare a destra salti delle carte)
        {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //carta skippata
          console.log("Contatore Carta " + contatoreCarta)
        }
        else {
          setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1) //nuova carta
        }
        checkNextCarta()

        console.log("Swipe a destra!");
      } else if (info.offset.x < -100) {
        changeIndicatore(false)
        handleSetScore();
        //
        if (carta?.skipCarteDirection == 0 || carta?.skipCarteDirection == 1) { //swipe a sinistra 0(entrambi i lati) 1 (se scegli di andare a sinistra salti delle carte)
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
      handleSetScore();
      console.log("carta evneto") //controllare se si riporta la carta evento al centro se conta lo score
      if (carta?.skipCarteDirection == true) {
        setContatoreCarta(prevContatoreCarta => prevContatoreCarta + carta.numSkipCarte) //nuova carta skippata
      }
      else {
        setContatoreCarta(prevContatoreCarta => prevContatoreCarta + 1) //nuova carta
      }
      checkNextCarta()

    }

    setAdviceEtica(false)
    setAdvicePopolo(false)
    setAdviceProgresso(false)

    fakeOneClick.current = setTimeout(() => {
      SetInfoOffsetX(0);
    }, 400)
    setFlipped(false)
  };

  useEffect(() => {
    // Cleanup function per cancellare il timeout se il componente viene smontato
    return () => {
      if (fakeOneClick.current) {
        clearTimeout(fakeOneClick.current);
      }
    };
  }, []);

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
    console.log(x)
    setTimeout(() => {
      console.log("end")
      setAnimationNewCard(false)
    }, (x * 100) + 500); // Sostituisci 1000 con la durata dell'animazione più il ritardo
  }

  const [titleHeight, setTitleHeight] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(0);

  {/**update size card */ }
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
            <h1 className='font-custom text-secondary text-3xl ' dangerouslySetInnerHTML={{
              __html: statusGioco ? cartaMorte.titolo : carta.titolo
            }}></h1>
          </div>

          {/** carta*/}
          <div className="w-full cardSpecial relative aspect-4/5" onClick={handleFlip}>
            <div className="z-50 absolute w-full h-full transition-all ease-out duration-300"
              style={{
                transform: flipped ? "rotateY(180deg)" : "",
                WebkitTransform: flipped ? "rotateY(180deg)" : "",
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d'
              }}>
              <div id='front' className=" absolute w-full h-full flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                {statusGioco ? (//carta morte
                  <div className="w-full aspect-4/5 relative z-10 cardSpecial rounded-3xl " onClick={handleFlip}>
                    <Image sizes="100vw, 100vw" alt="asd" src={cartaMorte.img} className=" point-event-none rounded-3xl z-0" draggable="false" fill="true" 	></Image>
                  </div>
                ) : (
                  <motion.div
                    drag={animationNewCard ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragControls={controls}
                    onDragStart={handleDragStart}
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
                            transition={{ duration: 0.5, delay: (index * 0.1) }}
                            onAnimationComplete={index == (mazzo.carta.length - 1) ? handleAnimationComplete(index) : ""}
                          >
                            <Image sizes="100vw, 100vw" alt="carta sfondo" src="/copertina.svg" className="point-event-none rounded-3xl " draggable="false" fill="true"	></Image>
                          </motion.div>
                        })) : ("")}

                    </div>
                    {/** carta che scorre */}
                    <div className="w-full aspect-4/5 relative  ">
                      {!carta.testoDestra ? ("") :
                        (<motion.h1 className="md:text-3xl text-xl h-1/4 font-custom w-full rounded-t-3xl z-10 text-secondary bg-black-opacity cursor-pointer-none text-right absolute right-0 p-5 " style={{ opacity: textOpacityRight }}>{carta.testoDestra}</motion.h1>)}
                      {!carta.testoSinistra ? ("") :
                        (<motion.h1 className="md:text-3xl text-xl h-1/4 font-custom w-full rounded-t-3xl z-10 text-secondary bg-black-opacity cursor-pointer-none absolute text-left left-0 p-5" style={{ opacity: textOpacityLeft }}>{carta.testoSinistra}</motion.h1>)}
                      <img sizes="100vw, 100vw" alt="carta image swipe" src={pathCarta} className="point-event-none rounded-3xl z-0 bg-cover" draggable="false" fill="true"></img>
                    </div>
                  </motion.div>)}
              </div>
              <div id="back" onClick={statusGioco ?  (e) => e.stopPropagation() : () => { }} className="z-50 absolute rounded-3xl w-full h-full bg-primary-light flex items-center justify-center rotate-y-180 transition-all ease-out duration-300"
                style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', WebkitTransform: 'rotateY(180deg)' }}>
                {statusGioco ? (
                  <div className="bg-primary w-full h-full flex flex-col rounded-3xl  ">
                    <form className="flex flex-col w-full p-16" onClick={(e) => e.stopPropagation()} onSubmit={async (event) => {
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
                  </div>) : "back testo"}
              </div>
            </div>

            {/**carta fissa retro */}
            <div className="w-full relative z-0">
              <div className="w-full aspect-4/5 relative ">
                <Image sizes="100vw, 100vw" alt="asd" src="/copertina.svg" className="point-event-none rounded-3xl bg-cover" draggable="false" fill="true" ></Image>
              </div>
            </div>
          </div>

          {/** descrizione carta */}
          <div className="w-full flex flex-col text-center font-custom justify-center items-center " style={{ height: descriptionHeight + "%" }}>
            <p className='text-secondary text-lg !leading-5' dangerouslySetInnerHTML={{__html :statusGioco ? cartaMorte.descrizione : carta.descrizione}}></p>
          </div>
        </div>

        {/**progress bar */}
        <div className="w-full flex h-auto bg-primary font-custom justify-center items-center px-12 py-6 md:px-16">
          <div className='relative w-[80%] flex justify-center items-center '>
            <span className='w-full h-[3px] bg-secondary'></span>
            <span id="swiper" className='absolute w-[3px] h-[30px] bg-primary-light z-100 transition-all ease-out duration-300' style={{ left: `${positionSwiper}%` }}></span>
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

