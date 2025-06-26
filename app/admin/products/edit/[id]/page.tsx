
'use client'

import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import { createClient } from "@/app/utils/supabase/client"
import React, { FormEvent, useEffect, useState } from "react"
import {  useSearchParams } from "next/navigation"
import ProductForm from "@/app/components/Admin/ProductForm/ProductForm"
import useAlert from "@/app/hooks/useAlert"
import { useRouter } from "next/navigation"



export default function EditProduct({
    params,
}:{
    params:Promise<{id:string}>,
}){
    const searchParams = useSearchParams()
    const {AlertComponent,setAlert} = useAlert(null)
    const [imgIsChanged,setImgIsChanged] = useState<boolean>(false)
    const router = useRouter()
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
        image_url:"",
        kit: [{ quantity: "1", text: "",price:"" }]
    })

    const id = React.use(params).id
    

    useEffect(()=>{
        function getProductParam(){
        try {
            const productParam = searchParams.get("product")
            return productParam ? JSON.parse(decodeURIComponent(searchParams.get("product") as string)) : null
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return null
        }
    }
        const getProduct = async ()=>{
            setAlert(null)
            const productParam = getProductParam()
            if (productParam) {
               return setProduct(productParam)
            }
            try {
                const supabase =   createClient()
                const {data,error} = await supabase.from("products").select().eq("id",id).single()
                if (error) {
                    return setAlert({message:`Errore durante il recupero del prodotto: ${error.message}`,color:"bg-red-500"})
                }
                setProduct(data)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                return setAlert({message:`Errore durante il recupero del prodotto`,color:"bg-red-500"})
            }
        }
        getProduct()
    },[params,id,searchParams,setAlert])


    

  
    const handleSubmit = async (e:FormEvent,product:ProductCardProps,img:File)=>{
        e.preventDefault()
        try {
            if (!product) {
                throw new Error("Prodotto non valido")
            }
            const formdata = new FormData()
            formdata.set("product",JSON.stringify(product))
           
            if (imgIsChanged) {
                formdata.set("imgIsChanged","1")
                 formdata.set("img",img)
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/admin/products/edit`,{
                method:"PUT",
                body:formdata,
                cache:"no-store"
            })
            const data = await res.json()
            if (data.success) {
                setImgIsChanged(false)
                setAlert({message:data.message,color:"bg-green-500"})
                router.replace("/admin/products")
                return true                
            }else{
                if (data.error?.constraint?.message) {
                    setAlert({message:`Errore durante la modifica del prodotto: ${data.error.constraint.message}`,color:"bg-red-500",time:7000})
                    return false
                }
                setAlert({message:`Errore durante la modifica del prodotto: ${data.error.message}`,color:"bg-red-500",time:5000})
                return false
            }
            
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setAlert({message:`Errore durante la modifica del prodotto`,color:"bg-red-500",time:5000})
             return false
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
             productProps={{...product,kit:product.kit}} 
             setImgIsChanged={setImgIsChanged}
             />
        </div>
    )
}