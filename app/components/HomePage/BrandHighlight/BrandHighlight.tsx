import Image from 'next/image'
import React from 'react'
import tazza from "@/public/assets/images/tazza.jpg"

const BrandHighlight = () => {
  return (
    <article className="flex flex-row  justify-between  max-md:flex-col-reverse gap-4 ">
    <div className="flex flex-col gap-6 cl-blue-text w-[55%] max-md:w-full">
        <h2 className="font-bold text-2xl tracking-tight pr-2 max-lg:text-xl">Scopri il gusto autentico della Sicilia con Ottimo Caffè!</h2>
        <p className="font-normal">Le nostre cialde da caffè sono preparate con passione e cura, utilizzando solo le migliori miscele siciliane per regalarti un caffè dal sapore intenso e ricco. </p>
        <p className="font-normal">Ma non è solo la qualità del nostro caffè a fare la differenza: con un servizio clienti sempre attento e disponibile, siamo qui per offrirti un’esperienza che ti farà tornare ogni volta.</p>
    </div>
    <Image className="w-[508px]  min-md:h-[85%]" src={tazza}  alt="Ottimo Caffè - Caffè siciliano"/>
  </article>
  )
}

export default BrandHighlight