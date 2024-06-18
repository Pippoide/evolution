'use client'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function IconProgress({ progress }) {

  const [isMounted, setIsMounted] = useState(false); // Stato per controllare se il componente è montato
  const svgRef = useRef(null); // Riferimento per il SVG

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Incremento del progresso ogni secondo
  // Aggiorna le dimensioni del rect in base al progresso
  useEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current; // Accesso all'elemento SVG
      const ingranaggio = svgElement.getElementById('ingranaggio');
      const bbox = ingranaggio.getBBox(); // Ottieni le dimensioni di <g>

      const rect = svgElement.getElementById('clip-rect');
      rect.setAttribute('width', bbox.width);
      rect.setAttribute('x', bbox.x);
      rect.setAttribute('height', (progress / 100) * bbox.height);
      rect.setAttribute('y', bbox.y + bbox.height - (progress / 100) * bbox.height);
    }
  }, [progress]); // Questa useEffect dipende da progress

  return (
    <div className='w-full h-full  '>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180 ">
        <defs>
          <clipPath id='progresso'>
            <rect className={isMounted ? 'transition-all ease-out duration-300' : ''} id="clip-rect" width={0} height={0} x={0} y={0} />
          </clipPath>
        </defs>
        <g fill='#f4ead7' >
          <path id='ingranaggio' d="M180.9,81.3c-.3-2.6-1.6-5-3.6-6.6-2-1.6-4.5-2.3-7.1-1.9-.2,0-.4,0-.6,0h-.1c-6.7.8-12.3-2.5-15-9-2.4-5.6-2.2-13.8,3.7-18.5,2.1-1.6,3.4-4.1,3.6-6.7.2-2.6-.6-5.1-2.2-7.1-3.5-4.1-7.5-8-11.7-11.4-2-1.6-4.7-2.4-7.3-2-2.6.3-4.8,1.7-6.3,3.8-4.8,6.6-12.6,6.4-17.8,4.4-5.3-2.1-11-7.4-10-15.4.3-2.6-.4-5.1-2-7.1-1.7-2-4.1-3.3-6.7-3.5-5.5-.4-11-.4-16.4.2-2.6.3-5,1.6-6.6,3.7-1.6,2.1-2.3,4.6-1.8,7.2,1.3,8-4.3,13.4-9.5,15.7-5.2,2.2-13,2.6-17.9-3.8-1.6-2.1-3.9-3.3-6.5-3.6-2.6-.3-5.2.6-7.2,2.3-4.2,3.6-8,7.5-11.4,11.8-1.6,2-2.4,4.7-2,7.3s1.7,4.8,3.7,6.4c6.5,4.8,6.4,12.6,4.3,17.8s-7.4,11-15.4,9.9c-2.5-.3-5.1.4-7.1,2-2,1.6-3.3,4.1-3.5,6.7-.4,5.5-.4,11,.2,16.4.3,2.6,1.6,5,3.7,6.6,2.1,1.6,4.6,2.3,7.1,1.9,7.9-1.2,13.4,4.4,15.6,9.6,2.2,5.2,2.5,12.9-3.8,17.9-2,1.6-3.3,3.9-3.6,6.5-.3,2.6.6,5.2,2.2,7.2,3.6,4.2,7.5,8,11.8,11.4,2,1.6,4.7,2.4,7.3,2.1,2.6-.3,4.8-1.6,6.4-3.7,4.8-6.5,12.6-6.4,17.8-4.3,5.2,2.1,11,7.4,9.9,15.4-.3,2.5.4,5.1,2,7.1,1.6,2,4.1,3.3,6.7,3.5,2.4.2,4.9.3,7.3.3s6.1-.1,9.1-.5c2.6-.3,5-1.6,6.6-3.7,1.6-2.1,2.3-4.6,1.9-7.2-1.2-8,4.4-13.4,9.6-15.6,5.2-2.2,13-2.5,17.9,3.9,1.6,2,3.9,3.3,6.5,3.6,2.6.3,5.3-.5,7.2-2.2,4.1-3.5,8-7.5,11.5-11.8,1.7-2,2.4-4.7,2.1-7.3s-1.7-4.9-3.8-6.4c-6.5-4.8-6.4-12.6-4.3-17.9,2.1-5.2,7.4-11,15.4-9.9,2.6.3,5.1-.4,7.1-2,2-1.6,3.3-4.1,3.6-6.7.2-2.4.3-4.8.3-7.3s-.2-6.2-.5-9.3h0ZM119.5,90.7c0,15.9-12.9,28.8-28.8,28.8s-28.8-12.9-28.8-28.8,12.9-28.8,28.8-28.8,28.8,12.9,28.8,28.8Z">
          </path>
        </g>
        <use clipPath="url(#progresso)" href="#ingranaggio" fill="#778c2a" />
      </svg>
    </div>

  )
}