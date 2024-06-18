'use client'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IconPopolo({ progress }) {

    const svgRef = useRef(null); // Riferimento per il SVG
    const [isMounted, setIsMounted] = useState(false); // Stato per controllare se il componente è montato

    useEffect(() => {
        setIsMounted(true);
      }, []);


    // Aggiorna le dimensioni del rect in base al progresso
    useEffect(() => {
        if (svgRef.current) {
            const svgElement = svgRef.current; // Accesso all'elemento SVG
            const dollaro = svgElement.getElementById('dollaro');
            const bbox = dollaro.getBBox(); // Ottieni le dimensioni di <g>

            const rect = svgElement.getElementById('clip-rect');
            rect.setAttribute('width', bbox.width);
            rect.setAttribute('x', bbox.x);
            rect.setAttribute('height', (progress / 100) * bbox.height);
            rect.setAttribute('y', bbox.y + bbox.height - (progress / 100) * bbox.height);
        }
    }, [progress]); // Questa useEffect dipende da progress

    return (
        <div className='w-full h-10  '>
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180 ">
                <defs>
                    <clipPath id='popolo'>
                        <rect className={isMounted ? 'transition-all ease-out duration-300' : ''} id="clip-rect" width={0} height={0} x={0} y={0} />
                    </clipPath>
                </defs>
                <g fill='#f4ead7' >
                    <path id='dollaro' d="M97.8219133669,181.4173228346c2.4062804454,0,4.3533462094-1.9470657641,4.3533462094-4.3533462094v-16.5041767661c25.6058151123-2.635887786,42.8998276767-17.4960681452,42.8998276767-39.7955319468s-12.8763695728-33.9359621433-42.8998276767-41.7242392138l-.0000560565.0000140141v-39.2536760004c6.4657505602,1.7082791749,12.9406663549,4.6380710837,19.5992792334,8.6332304023,2.038914306,1.2306919824,4.0870218746,1.8368587251,6.1259361806,1.8368587251,6.3463502586,0,11.4528152721-4.8952301841,11.4528152721-11.23238718,0-4.9044094326-2.856301864-7.9719741543-6.135101415-9.8088328794-9.239397145-5.8320320578-19.2594648538-9.680239315-31.0429012428-11.1589111493V4.3533602236C102.1752315481,1.9470797782,100.228165784,0,97.8218853387,0h-10.3047785689C85.1200055729,0,83.1637465462,1.9470657641,83.1637465462,4.3533602236v13.4733570669c-25.2108831991,2.2225973757-42.3120334452,17.2848473299-42.3120334452,38.9689511261s13.4458053071,33.9818864143,42.3120474593,41.7334324764v40.3465951699c-10.6170411888-2.1583146076-19.6268309931-6.7504614204-28.8294971298-13.4090742988-1.8460379736-1.4235543007-4.2982426899-2.2501631495-6.7412681577-2.2501631495-6.3371569959,0-11.2507596912,4.9136026953-11.2507596912,11.2507596912,0,4.2890774555,2.0480935545,7.5494904813,5.5197554238,9.8088188652,12.3069478525,8.6791686874,26.2027885924,14.1529998402,41.3017695549,15.8704582637v16.9174811906c0,2.4062804454,1.9562590267,4.3533462094,4.3533602236,4.3533462094h10.304792583ZM83.1637045038,73.915205188c-14.557111002-4.9778854633-18.2032766925-10.2221232897-18.2032766925-18.5430910721s6.070818647-15.4296160936,18.2032766925-17.0184949669v35.561586039ZM102.1752035199,139.7941534537v-36.5443121837c14.5662762364,4.7850231451,18.7818916754,10.2496750494,18.7818916754,18.9563674683,0,9.4414527259-6.6218678561,15.8520997666-18.7818916754,17.5879166871v.0000280282Z">
                    </path>
                </g>
                <use clipPath="url(#popolo)" href="#dollaro" fill="#778c2a" />
            </svg>
        </div>
    )
}