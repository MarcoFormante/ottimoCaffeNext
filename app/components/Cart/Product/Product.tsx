'use client'
import { Context, ProductPropsWithQuantity } from "@/app/context/CartContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

interface ProductProps{
    product:ProductPropsWithQuantity
    setProductsState:React.Dispatch<React.SetStateAction<ProductPropsWithQuantity[]>>
    setPrice:React.Dispatch<React.SetStateAction<number>>
}

export default function Product({product,setProductsState,setPrice}:ProductProps){
    const cartContext = useContext(Context)
    const [quantity,setQuantity] = useState(product.quantity)
    const basePrice = product.offer ? product.offer : product.price

    
    function addQuantity(){
        if (quantity < 99) {
            setQuantity(quantity + 1)
            setPrice(prev => prev + +basePrice)
        }
    }

    function subTraitQuantity(){
        if (quantity > 1 ) {
            setQuantity(quantity - 1)
            setPrice(prev => prev - +basePrice) 
        }
    }


    function deleteProductFromCart(){
        const filteredProducts = cartContext.products.filter(p => p.code !== product.code)
        cartContext.setProducts(filteredProducts)
        setProductsState(filteredProducts)
         setPrice(prev => prev - (+basePrice * quantity))
    }


    useEffect(()=>{
       setPrice(prev => prev + (+basePrice * quantity))
    },[])



    return(
        <div className="py-10 max-md:py-5 border-b-2  border-gray-400">
            <div className="flex items-center gap-6 max-md:gap-2 max-md:justify-between max-lg:justify-evenly">
                <div>
                    <Image src={"/assets/images/products/productTest.png"} alt="prodotto nel carrello" width={153} height={142} />
                </div>

                <div className="flex gap-6 min-md:items-center max-md:flex-col w-full place-content-center max-lg:w-[70%] " >
                    <div className="min-md:max-w-[242px] max-md:order-2">
                        <p className="text-blue-text max-md:text-[14px]">Ottimo Caffè <br/> Kit macchinetta del caffè Frog + 1 confezione da 30 cialde</p>
                    </div>

                    <div className="border-l-1 border-gray-500 opacity-30 h-[69px] max-md:hidden "></div>

                        <div className="flex min-md:gap-6   max-[512px]:justify-between  max-[512px]:gap-6  max-[768px]:gap-30  max-md:order-3">
                            <div>
                                <div className='flex flex-col gap-3'>
                                    <span className="text-blue-text max-md:font-semibold max-md:text-[14px]">Quantità</span>
                                    <div>
                                        <div className='flex gap-[13px] items-center border-1 rounded-lg border-gray-400 w-[95px] text-blue-text justify-center '>
                                            <button className='appearance-none p-1 cursor-pointer' onClick={subTraitQuantity}><span className='w-2.5 h-[1.5px] bg-blue-text block'></span></button>
                                            <span className='p-1'>{quantity}</span>
                                            <button className='appearance-none p-1 cursor-pointer' onClick={addQuantity}><span className='block'>+</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-l-1 border-gray-500 opacity-30 h-[69px] max-md:hidden "></div>
                            <div>
                                <div className='flex flex-col gap-3 text-blue-text'>
                                    <span className="max-md:font-semibold max-md:text-[14px]">Prezzo</span>
                                    <span className="flex items-center gap-1 max-md:font-semibold max-md:text-blue-primary">{+(parseFloat(product.offer ? product.offer : product.price)* quantity).toFixed(2) } <span className="text-[12px] max-md:hidden">EUR</span> <span className="min-md:hidden">€</span></span>
                                </div>
                            </div>
                            <div className="border-l-1 border-gray-500 opacity-30 h-[69px] max-md:hidden"></div>
                        </div>

                        <div className="place-items-center grid max-md:order-1 place-content-end">
                        
                            <div className="flex items-center gap-2 text-blue-text"> 
                                <span className="min-md:hidden max-md:text-[14px]">Rimuovi</span> 
                                <svg onClick={deleteProductFromCart} className="cursor-pointer max-md:h-[32px] max-md:w-[100%]"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="1" y="1" width="22" height="22" rx="11" stroke="#292F6C" strokeWidth="1"/>
                                    <path d="M8 17L7 16L11 12L7 8L8 7L12 11L16 7L17 8L13 12L17 16L16 17L12 13L8 17Z" fill="#292F6C"/>
                                </svg>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

