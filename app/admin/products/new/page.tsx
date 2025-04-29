'use client'

import ProductCard, { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import {  FormEvent, useState } from "react"
import ProductForm from "@/app/components/Admin/ProductForm/ProductForm"

export default function NewProduct(){
    const [openViewCards,setOpenViewCards] = useState(false)
    const [error,setError] = useState("")

   
   
    const handleSubmit = async (e:FormEvent,product:ProductCardProps)=>{
           e.preventDefault()
           try {
                const res = await fetch("/api/admin/products/new",{
                    method:"POST",
                    body:JSON.stringify(product),
                })
                const data = await res.json()
                if (data.success) {
                    window.location.reload()
                }else{
                    setError("Errore durante la creazione del Prodotto : " + data?.error)
                }
            } catch (error) {
                setError("Errore durante la creazione del Prodotto : " + error)
            }
       }


   
    return (
        <div className="pb-20">
              { error &&  <div className="flex w-full flex-col gap-2">
                <div className="font-regular relative block w-full bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                {error}
                </div>
            </div>}
            <h1 className="text-2xl mt-4 ml-4 font-semibold">Crea un Prodotto</h1>
            <ProductForm handleSubmit={handleSubmit} hiddenStatus={true} />
          
            {/* <div
            onClick={()=>setOpenViewCards(!openViewCards)} 
                className="fixed bottom-10 right-10 text-white border px-5 py-5 w-5 h-5 rounded-4xl flex justify-center items-center">
                ?
            </div>
            <div className='flex justify-center' hidden={openViewCards}>
             <ProductCard 
                        id={""}
                        name={product?.name || ""}
                        description={product?.description || ""}
                        price={product?.price || ""}
                        image_url={product?.img ? URL.createObjectURL(product.img) : ""}
                        category={product?.category || ""}
                        code={product?.code || ""}
                        slug={product?.slug || ""}
                        offer={product?.offer || ""}
                        active={product?.active || true}
                        stripe_price_id={product?.stripe_price_id || ""}
                        stripe_product_id={product?.stripe_product_id || ""}
                        hideDetails={true}
                />
            </div> */}

        </div>
    )
}

