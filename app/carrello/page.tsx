"use client"

import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb"
import Product from "../components/Cart/Product/Product"
import CartSummary from "../components/Cart/CartSummary/CartSummary"
import { Context, ProductPropsWithQuantity } from "../context/CartContext"
import { useContext, useEffect, useState } from "react"
import { lengthBasedText } from "../utils/helpers/function"


export default  function Cart(){
    const cartContext = useContext(Context)
    const [productsState,setProductsState] = useState<ProductPropsWithQuantity[]>([])
    const [price,setPrice] = useState<number>(0)
    
    useEffect(()=>{
        if (cartContext.products.length > 0) {
            setProductsState(cartContext.products)
        }
    },[cartContext.products])

    const articlesLengthBasedText = lengthBasedText(productsState.length,"articoli","1 articolo")
   
    
  return (
    <div>
        <div className='min-h-[70dvh] px-[200px] max-2xl:px-[50px] max-lg:px-[16px] mb-15'>
            <Breadcrumb categoryName={"carrello"}/>
            <div>
                <div className="flex flex-col mt-12 max-md:mt-6">
                    {/* {SCROLLABLE} */}
                    <div className="flex gap-6 max-lg:flex-col">
                        <div className="">
                        <div className="flex flex-col gap-[9px] max-lg:flex-row max-lg:justify-between max-lg:pb-4 max-lg:border-b-2 max-lg:border-gray-400 ">
                            <h1 className="font-bold text-blue-text text-2xl">Il tuo carrello </h1>
                            <span className="min-lg:text-[12px] text-gray-500  max-lg:mt-1 ">{articlesLengthBasedText} nel carrello</span>
                        </div>
                           { productsState.length > 0 && 
                           <div>
                            {productsState.map(p => {
                                return <Product 
                                key={p.code}
                                product={p} 
                                setProductsState={setProductsState} 
                                setPrice={setPrice}
                                 />
                            })}
                            
                           </div>
                            }
                        </div>
                        
                        <CartSummary price={price} products={productsState} />
                    </div>
                </div>
            </div>
         
        </div>
    </div>
  )
}

