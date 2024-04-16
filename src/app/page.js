'use client';

import { motion, useDragControls, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const controls = useDragControls()
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0.8, 1, 1, 1, 0.8]);
  const scale = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-200, 0, 200], [-45, 0, 45]);
  const textOpacityLeft = useTransform (x, [0,-50],[0,1]);
  const textOpacityRight = useTransform (x, [0,50],[0,1])


  const handleDragEnd = (event, info) => { 


    if (info.offset.x > 1) {
  
      // Esegui azione di swipe a destra
      console.log("Swipe a destra!");
    } else if (info.offset.x < -1) {
 
      // Esegui azione di swipe a sinistra
      console.log("Swipe a sinistra!");
    }

    // Resetta la posizione del div
    x.set(0);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="sm:w-1/3 w-full min-h-screen bg-red-50 p-5 relative flex flex-col justify-between">  {/**column */}
        {/**icons */}
        <div className="w-full flex flex-row justify-evenly items-center">
          <div className="w-10 h-10 relative">
            <Image src="/bilancia.svg" fill objectFit="contain" className="point-event-none" draggable="false"></Image>
          </div>
          <div className="w-10 h-10 relative">
            <Image src="/scienza.svg" fill objectFit="contain" className="point-event-none" draggable="false"></Image>
          </div>
          <div className="w-10 h-10 relative">
            <Image src="/persona.svg" fill objectFit="contain" className="point-event-none" draggable="false"></Image>
          </div>
        </div>
        {/**card */}
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
            <div className="w-full aspect-square relative">
              <motion.h1 className="text-3xl z-10 cursor-pointer-none text-white absolute right-0 p-5 " style={{opacity:textOpacityRight}}>destra</motion.h1>
              <motion.h1 className="text-3xl z-10 cursor-pointer-none text-white absolute left-0 p-5" style={{opacity:textOpacityLeft}}>sinistra</motion.h1>
              <Image src="/bodoni.jpg" className=" point-event-none rounded-3xl z-0" draggable="false" objectFit='cover' fill 	></Image>
            </div>
          </motion.div>
          <div className="w-full aspect-square absolute top-0 z-0">
            <div className="w-full aspect-square relative">
              <Image src="/Abstract Blue Carte Da Gioco Texture.jpg" className="point-event-none rounded-3xl " draggable="false" objectFit='cover' fill 	></Image>
            </div>
          </div>
        </div>
        {/**text */}
        <div className="w-full flex flex-col text-center">
          <h1>Gian Battista Bodoni</h1>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra arcu nec bibendum tincidunt. Nullam dictum purus in magna molestie blandit. Vivamus imperdiet urna justo, a egestas erat dictum sit amet. Sed sodales metus in neque pretium, ac imperdiet metus viverra. Nulla malesuada id justo sit amet molestie. Ut non eleifend neque. Curabitur eget lacinia dolor, ut consequat orci. Maecenas molestie ac leo quis aliquet. Cras lacinia vitae nulla vel pharetra.</p>
        </div>
      </div>

    </main>
  );
}
