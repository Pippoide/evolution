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
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64 ">
                <defs>
                    <clipPath id='popolo'>
                        <rect className={isMounted ? 'transition-all ease-out duration-300' : ''} id="clip-rect" width={0} height={0} x={0} y={0} />
                    </clipPath>
                </defs>
                <g fill='#f4ead7' >
                    <path id='dollaro' d="
                    M36,27.8V14c2.3,0.6,4.6,1.6,6.9,3c0.7,0.4,1.4,0.6,2.2,0.6c2.2,0,4-1.7,4-4c0-1.7-1-2.8-2.2-3.5
C43.7,8.2,40.2,6.9,36,6.4V2.2C36,1,35.1,0,33.9,0h-2.3c-1.2,0-2.2,1-2.2,2.2v4.1C20.5,7.1,14.4,12.4,14.4,20s4.7,12,14.9,14.7v14.2
c-3.7-0.8-6.9-2.4-10.2-4.7c-0.6-0.5-1.5-0.8-2.4-0.8c-2.2,0-4,1.7-4,4c0,1.5,0.7,2.7,1.9,3.5c4.3,3.1,9.2,5,14.5,5.6v5.4
c0,1.2,1,2.2,2.2,2.2h2.3c1.2,0,2.2-1,2.2-2.2v-5.3c9-0.9,15.1-6.2,15.1-14S46.6,30.6,36,27.8L36,27.8z M22.9,19.5
c0-3.1,2.1-5.4,6.4-6V26C24.2,24.3,22.9,22.4,22.9,19.5z M36,49.2V36.4c5.1,1.7,6.6,3.6,6.6,6.7C42.7,46.4,40.3,48.6,36,49.2
L36,49.2z">
                    </path>
                </g>
                <use clipPath="url(#popolo)" href="#dollaro" fill="#778c2a" />
            </svg>
        </div>
    )
}
