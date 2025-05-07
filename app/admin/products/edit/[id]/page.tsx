/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import ProductCard, { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import { createClient } from "@/app/utils/supabase/client"
import React, { FormEvent, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import ProductForm from "@/app/components/Admin/ProductForm/ProductForm"
import useAlert from "@/app/hooks/useAlert"



export default  function EditProduct({
    params,
}:{
    params:Promise<{id:string}>,
}){
    const searchParams = useSearchParams()
    const {AlertComponent,setAlert} = useAlert(null)
    const [product,setProduct] = useState<ProductCardProps & {img:File}| null>({
        id:"",
        name:"",
        price: "",
        description: "",
        category: "",
        code: "",
        img: null as unknown as File,
        active: false,
        stripe_price_id: "",
        stripe_product_id: "",
        slug: "",
        offer: "" ,
        image_url:""
    })

    const id = React.use(params).id
    

    useEffect(()=>{
        const getProduct = async ()=>{
            setAlert(null)
            const productParam = getProductParam()
            if (productParam) {
               return setProduct(productParam)
            }
            try {
                const supabase =  createClient()
                const {data,error} = await supabase.from("products").select().eq("id",id).single()
                if (error) {
                    return setAlert({message:`Errore durante il recupero del prodotto: ${error.message}`,color:"bg-red-500"})
                }
                setProduct(data)
            } catch (error) {
                return setAlert({message:`Errore durante il recupero del prodotto`,color:"bg-red-500"})
            }
        }
        getProduct()
    },[params.toString()])


    function getProductParam(){
        try {
            const productParam = searchParams.get("product")
            return productParam ? JSON.parse(decodeURIComponent(searchParams.get("product") as string)) : null
        } catch (error) {
            return null
        }
    }

  
    const handleSubmit = async (e:FormEvent,product:ProductCardProps)=>{
        e.preventDefault()
        try {
            if (!product) {
                throw new Error("Prodotto non valido")
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/admin/products/edit`,{
                method:"PUT",
                body:JSON.stringify(product),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            if (data.success) {
                return setAlert({message:data.message,color:"bg-green-500"})
            }else{
                if (data.error?.constraint?.message) {
                    return setAlert({message:`Errore durante la modifica del prodotto: ${data.error.constraint.message}`,color:"bg-red-500",time:7000})
                }
                return setAlert({message:`Errore durante la modifica del prodotto: ${data.error.message}`,color:"bg-red-500",time:5000})
            }
            
        } catch (error) {
            return setAlert({message:`Errore durante la modifica del prodotto`,color:"bg-red-500",time:5000})
        }
    }



    if (!product) {
        return (
            <div>
                Prodotto Non Trovato
            </div>
        )
    }


    return product?.id && (
        <div className="pb-20">
            <AlertComponent/>
            <h1 className="text-2xl mt-4 ml-4 font-semibold">Modifica Prodotto</h1>
            <ProductForm
             handleSubmit={handleSubmit} 
             productProps={product} 
             />
        </div>
    )
}