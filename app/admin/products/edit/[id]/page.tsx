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
            const res = await fetch("/api/admin/products/edit",{
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
                {/* <form className="mt-10  p-10">
                        <div className="flex flex-row justify-center gap-20  max-md:gap-0 max-md:flex-col  max-md:items-center">
        
                            <div className="border p-15 max-md:p-5  flex flex-col gap-7 min-w-[350px] w-[500px] max-md:border-none">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="font-semibold">Nome</label>
                                    <textarea required className="border rounded p-2" id="name" placeholder="Nome prodotto" value={product?.name} onChange={(e)=>setProduct({...product,name:e.target.value})} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="img" className="font-semibold">Immagine</label>
                                    <input required className="border rounded p-2" type="file" id="img" onChange={(e)=>{
                                        if (e.target.files && e.target.files[0]) {
                                            setProduct({...product,img:e.target.files[0] })
                                        }
                                        }}  
                                    />
                                    <div className="mt-2 w-[100px] h-[100px] m-auto">
                                        {product?.img ? <Image priority width={100} height={100} src={URL.createObjectURL(product?.img)} alt="" /> 
                                            : product?.image_url ? <Image priority width={100} height={100} src={`/assets/images/products/${product?.image_url}`} alt="" /> 
                                            : null
                                            }
                                    </div>
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="slug" className="font-semibold">Slug</label>
                                    <input required className="border rounded p-2" type="text" id="slug" placeholder="Slug Prodotto" value={product?.slug} onChange={(e)=>setProduct({...product,slug:e.target.value})} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="category" className="font-semibold">Categoria</label>
                                      <select required className="border rounded p-2" id="category" value={product?.category}  onChange={(e)=>setProduct({...product,category:e.target.value})}  >
                                            <option value={"prod-category_" + product?.category}>{categories.find(c => c.href.replace("/","") === product?.category)?.nameInNav}</option>
                                              {categories.map((c,i)=>{
                                                  const value = c.href.replace("/","")
                                                  return value !== product?.category && <option key={c.href} value={value}>{c.nameInNav}</option>
                                              })}
                                        </select>      
                                </div>
                            </div>
        
                            <div className="border p-15 max-md:p-5 flex flex-col gap-7 min-w-[350px] w-[500px]  max-md:border-none">
                                <div className="flex flex-col">
                                    <label htmlFor="code" className="font-semibold">Codice</label>
                                    <input required className="border rounded p-2" type="text" id="code" placeholder="Codice prodotto" value={product?.code} onChange={(e)=>setProduct({...product,code:e.target.value})}  />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="price" className="font-semibold">Prezzo</label>
                                    <input required className="border rounded p-2" type="text" id="price" value={product?.price} placeholder="Scegli il Prezzo (ex. 9.00)" onChange={(e)=>setProduct({...product,price:e.target.value})} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="offer" className="font-semibold">Offerta</label>
                                    <input className="border rounded p-2" type="text" id="offer"  placeholder="Scegli il Prezzo Scontato (opzionale)" value={product?.offer as string} onChange={(e)=>{
                                        setProduct({...product,offer: e.target.value ?? null})
                                    }} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="font-semibold">Descrizione</label>
                                    <textarea className="border rounded p-2" id="description" placeholder="Scrivi una descrizione (opzionale)" value={product?.description || ""} onChange={(e)=>setProduct({...product,description:e.target.value})} />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="status" className="font-semibold">Stato</label>
                                    <div>
                                        <input type="checkbox" className="self-baseline" id="status" checked={product?.active} onChange={(e)=>setProduct({...product,active:e.target.checked})}  /> 
                                        <span className={`ml-3 px-3 text-white ${product?.active ? "bg-green-600 ":"bg-red-600 "}`}>{product?.active ? "Attivo" : "NON attivo"}</span>
                                    </div>
                                   
                                </div>
        
                                <div className="mt-2">
                                    <button className="bg-black text-white w-[100px] p-3 rounded-lg cursor-pointer border font-bold transition hover:text-black hover:bg-transparent hover:border">Salva</button>
                                </div>
                              
                            </div>
                        </div>
</form> */}
                <ProductForm
                 handleSubmit={handleSubmit} 
                 productProps={product} 
                 />
                </div>
    )
}