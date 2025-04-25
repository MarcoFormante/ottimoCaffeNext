"use client"

import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb"
import Product from "../components/Cart/Product/Product"
import CartSummary from "../components/Cart/CartSummary/CartSummary"


export default  function Cart(){
    
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
                            <span className="min-lg:text-[12px] text-gray-500  max-lg:mt-1 ">1 articolo nel carrello </span>
                        </div>
                            <Product/>
                            <Product/>
                            <Product/>
                        </div>
                        
                        <CartSummary/>
                    </div>
                </div>
            </div>
         
        </div>
    </div>
  )
}

