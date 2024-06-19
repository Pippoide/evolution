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
    <div className='w-full h-8/10'>
      <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64 ">
        <defs>
          <clipPath id='progresso'>
            <rect className={isMounted ? 'transition-all ease-out duration-300' : ''} id="clip-rect" width={0} height={0} x={0} y={0} />
          </clipPath>
        </defs>
        <g fill='#f4ead7' >
          <path id='ingranaggio' d="M63.8,28.7c-0.1-0.9-0.6-1.7-1.3-2.3c-0.7-0.6-1.6-0.8-2.5-0.7c-0.1,0-0.1,0-0.2,0l-0.1,0
c-2.4,0.3-4.3-0.9-5.3-3.2c-0.8-2-0.8-4.9,1.3-6.5c0.7-0.6,1.2-1.4,1.3-2.3c0.1-0.9-0.2-1.8-0.8-2.5c-1.3-1.5-2.6-2.8-4.1-4
c-0.7-0.6-1.7-0.8-2.6-0.7c-0.9,0.1-1.7,0.6-2.2,1.3c-1.7,2.3-4.4,2.3-6.3,1.5c-1.9-0.7-3.9-2.6-3.5-5.4c0.1-0.9-0.1-1.8-0.7-2.5
c-0.6-0.7-1.4-1.2-2.4-1.2c-1.9-0.2-3.9-0.1-5.8,0.1c-0.9,0.1-1.8,0.6-2.3,1.3c-0.6,0.7-0.8,1.6-0.7,2.5c0.4,2.8-1.5,4.7-3.4,5.5
c-1.8,0.8-4.6,0.9-6.3-1.4c-0.6-0.7-1.4-1.2-2.3-1.3c-0.9-0.1-1.8,0.2-2.5,0.8c-1.5,1.3-2.8,2.7-4,4.2c-0.6,0.7-0.8,1.6-0.7,2.6
c0.1,0.9,0.6,1.7,1.3,2.2c2.3,1.7,2.2,4.4,1.5,6.3c-0.7,1.8-2.6,3.9-5.4,3.5c-0.9-0.1-1.8,0.1-2.5,0.7c-0.7,0.6-1.2,1.4-1.2,2.4
c-0.1,1.9-0.1,3.9,0.1,5.8c0.1,0.9,0.6,1.8,1.3,2.3c0.7,0.6,1.6,0.8,2.5,0.7c2.8-0.4,4.7,1.5,5.5,3.4c0.8,1.8,0.9,4.6-1.3,6.3
c-0.7,0.6-1.2,1.4-1.3,2.3c-0.1,0.9,0.2,1.8,0.8,2.5c1.3,1.5,2.6,2.8,4.1,4c0.7,0.6,1.7,0.8,2.6,0.7c0.9-0.1,1.7-0.6,2.2-1.3
c1.7-2.3,4.4-2.2,6.3-1.5c1.8,0.7,3.9,2.6,3.5,5.4c-0.1,0.9,0.1,1.8,0.7,2.5c0.6,0.7,1.4,1.2,2.4,1.2C30.3,64,31.2,64,32,64
c1.1,0,2.1-0.1,3.2-0.2c0.9-0.1,1.8-0.6,2.3-1.3c0.6-0.7,0.8-1.6,0.7-2.5c-0.4-2.8,1.5-4.7,3.4-5.5c1.8-0.8,4.6-0.9,6.3,1.4
c0.6,0.7,1.4,1.2,2.3,1.3c0.9,0.1,1.9-0.2,2.6-0.8c1.5-1.3,2.8-2.6,4-4.1c0.6-0.7,0.8-1.7,0.7-2.6c-0.1-0.9-0.6-1.7-1.3-2.2
c-2.3-1.7-2.3-4.4-1.5-6.3c0.7-1.8,2.6-3.9,5.4-3.5c0.9,0.1,1.8-0.1,2.5-0.7c0.7-0.6,1.2-1.4,1.3-2.4C64,33.7,64,32.8,64,32
C64,30.9,63.9,29.8,63.8,28.7L63.8,28.7z M42.2,32c0,5.6-4.6,10.2-10.2,10.2S21.8,37.6,21.8,32S26.4,21.8,32,21.8S42.2,26.4,42.2,32
z">
          </path>
        </g>
        <use clipPath="url(#progresso)" href="#ingranaggio" fill="#778c2a" />
      </svg>
    </div>

  )
}
