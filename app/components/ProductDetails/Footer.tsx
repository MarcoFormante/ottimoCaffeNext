'use client'

import React, { useState} from 'react'
import ButtonAddToCart from './ButtonAddToCart'


const Footer = ({children,isKit}:{children:React.ReactElement,isKit:boolean}) => {
    const [quantity,setQuantity] = useState(1)

    function addQuantity(){
        if (quantity < 99) {
            setQuantity(quantity + 1)
        }
       
    }

    function subTraitQuantity(){
        if (quantity > 1 ) {
            setQuantity(quantity - 1)
        }
    }

  return (
    <section className={`max-md:order-4 ${isKit ? "max-md:mt-8": ""}`}>
        <div className="flex justify-between w-[50%] max-xl:w-[75%] items-center max-md:flex-row-reverse max-md:w-full  ">
        {children}
        <div className='flex flex-col gap-3'>
            <span className="text-blue-text font-bold">Quantità</span>
            <div>
                <div className='flex gap-[13px] items-center border-1 rounded-lg border-gray-400 w-[95px] text-blue-text justify-center '>
                    <button className='appearance-none p-1 cursor-pointer' onClick={subTraitQuantity}><span className='w-2.5 h-[1.5px] bg-blue-text block'></span></button>
                    <span>{quantity}</span>
                    <button className='appearance-none p-1 cursor-pointer' onClick={addQuantity}>+</button>
                </div>
            </div>
        </div>
        </div>
      <ButtonAddToCart quantity={quantity}/>
  </section>
  )
}

export default Footer