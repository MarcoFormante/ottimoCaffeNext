'use client'

import React, { useState} from 'react'
import ButtonAddToCart from './ButtonAddToCart'


const Footer = ({isKit,price}:{isKit:boolean,price:string}) => {
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
console.log(+price * quantity);



  return (
    <section className={`max-md:order-4 ${isKit ? "max-md:mt-8": ""}`}>
        <div className="flex justify-between w-[75%] items-center max-md:flex-row-reverse max-md:w-full  ">
         <div className="flex flex-col max-lg:mt-[16px] mt-1.5 max-md:text-right">
            <span className="text-blue-text font-bold ">Totale</span>
            <span className="text-2xl font-bold text-blue-primary">{((parseFloat(price) as number) * quantity).toFixed(2)}<span className="text-[12px]"> EUR</span></span>
            <span className="text-gray-500 text-[12px]">iva inclusa</span>
        </div>
        <div className='flex flex-col gap-3'>
            <span className="text-blue-text font-bold">Quantità</span>
            <div>
                <div className='flex gap-[13px] items-center border-1 rounded-lg border-gray-400 w-[95px] text-blue-text justify-center '>
                    <button className='appearance-none p-1 cursor-pointer' onClick={subTraitQuantity}><span className='w-2.5 h-[1.5px] bg-blue-text block'></span></button>
                    <span className='p-1'>{quantity}</span>
                    <button className='appearance-none p-1 cursor-pointer' onClick={addQuantity}><span className='block'>+</span></button>
                </div>
            </div>
        </div>
        </div>
      <ButtonAddToCart quantity={quantity}/>
  </section>
  )
}

export default Footer