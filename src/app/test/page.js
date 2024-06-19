'use client'
import { useAmp } from 'next/amp';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Test() {

  const [flipped, setFlipped] = useState(false)

  return (
    <div className='w-full h-full flex justify-center items-center'>

      <div id='main' className='relative w-96 h-96 bg-black-opacity'>
        <div onClick={()=>setFlipped(!flipped)} id='card' className=' bg-secondary absolute w-full h-full transition-all ease-out duration-300 ' style={{ transformStyle: 'preserve-3d', transform: flipped ? "rotateY(180deg)" : "" }}>
          <div id='front' className='absolute w-full h-full bg-primary' style={{ backfaceVisibility: 'hidden' }}> fronte</div>
          <div id='back' className='absolute w-full h-full bg-secondary ' style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>dietro</div>
        </div>
      </div>
    </div>


  )
}