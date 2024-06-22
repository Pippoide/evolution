'use client'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IconEtica({ progress }) {

    const svgRef = useRef(null); // Riferimento per il SVG
    const [isMounted, setIsMounted] = useState(false); // Stato per controllare se il componente è montato

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Aggiorna le dimensioni del rect in base al progresso
    useEffect(() => {
        if (svgRef.current) {
            const svgElement = svgRef.current; // Accesso all'elemento SVG
            const bilancia = svgElement.getElementById('bilancia');
            const bbox = bilancia.getBBox(); // Ottieni le dimensioni di <g>

            const rect = svgElement.getElementById('clip-rect');
            rect.setAttribute('width', bbox.width);
            rect.setAttribute('x', bbox.x);
            rect.setAttribute('height', (progress / 100) * bbox.height);
            rect.setAttribute('y', bbox.y + bbox.height - (progress / 100) * bbox.height);
        }
    }, [progress]); // Questa useEffect dipende da progress

    return (
        <div className='w-full h-8/10'>
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64 ">
                <defs>
                    <clipPath id='etica'>
                        <rect className={isMounted ? 'transition-all ease-out duration-300' : ''} id="clip-rect" width={0} height={0} x={0} y={0} />
                    </clipPath>
                </defs>
                <g fill='#f4ead7' >
                    <path id='bilancia' d="M62.9,33.4h-1.1L57.5,26l0-0.1l-4.6-8.5c-0.1-0.3-0.4-0.5-0.7-0.5l-14.8-4l-0.3-0.1l0,0c0,0,0-0.1,0-0.1
c0-1.9-1-3.5-2.5-4.4V1.5c0-0.8-0.7-1.5-1.5-1.5H31c-0.8,0-1.5,0.7-1.5,1.5v6.9c-0.8,0.5-1.5,1.2-2,2L26.2,10L12.3,6.3
c-0.5-0.1-1,0.1-1.2,0.5l-9,16H1.1c-0.6,0-1.1,0.5-1.1,1.1c0,3.3,1.4,6.4,3.5,8.5c2.2,2.2,5.2,3.5,8.5,3.5s6.4-1.4,8.5-3.5
c2.2-2.2,3.5-5.2,3.5-8.5c0-0.6-0.5-1.1-1.1-1.1H22l-4.3-7.4l0-0.1l-3.3-5.6l12.2,3.3l0.4,0.1c0.1,1.8,1.1,3.4,2.6,4.3v40.4H19.1
c-1.4,0-2.4,1.1-2.4,2.4v1.5c0,1.4,1.1,2.4,2.4,2.4H45c1.4,0,2.4-1.1,2.4-2.4v-1.5c0-1.4-1.1-2.4-2.4-2.4H34.6V17.2
c0.7-0.4,1.3-1,1.7-1.7l0,0l0.4,0.1l13.6,3.6l-3.9,6.7c0,0-3.3,5.8-4.3,7.5H41c-0.6,0-1.1,0.5-1.1,1.1c0,3.3,1.4,6.3,3.5,8.5
c2.2,2.2,5.2,3.5,8.5,3.5s6.3-1.4,8.5-3.5c2.2-2.2,3.5-5.2,3.5-8.5C64,33.9,63.5,33.4,62.9,33.4L62.9,33.4z M15.8,16.3L15.8,16.3
l3.7,6.4H4.6l7.4-12.9L15.8,16.3L15.8,16.3z M44.5,33.4l7.4-12.9l3.7,6.4l0,0.1l3.7,6.4H44.5L44.5,33.4z"/>

                </g>
                <use clipPath="url(#etica)" href="#bilancia" fill="#778c2a" />
            </svg>
        </div>
    )
}
