'use client'

import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import { FormEvent} from "react"
import ProductForm from "@/app/components/Admin/ProductForm/ProductForm"
import useAlert from "@/app/hooks/useAlert"


export default function NewProduct(){
    const {AlertComponent,setAlert} = useAlert(null)
   
    const handleSubmit = async (e:FormEvent,product:ProductCardProps,img:File)=>{
           e.preventDefault()
           setAlert(null)
           
           try {
                const formData = new FormData()
                formData.set("product", JSON.stringify(product))
                formData.set("img",img)
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/admin/products/new`,{
                    method:"POST",
                    body:formData,
                })
                const data = await res.json()
                console.log(data);
                
                if (data.success) {
                   return setAlert({message:data.message,color:"bg-green-500",callback:()=>window.location.reload(),time:2000})
                }else{
                    if (data.error.constraint.type) {
                       return  setAlert({message:"Errore durante la creazione del Prodotto : " + data.error.constraint.message,color:"bg-red-500",})
                    }
                    return  setAlert({message:"Errore durante la creazione del Prodotto : " + data.error.message,color:"bg-red-500"})
                }
            } catch (error) {
                setAlert({message:"Errore durante la creazione del Prodotto : " + error,color:"bg-red-500"})
            }
       }

   
    return (
        <div className="pb-20" >
             <AlertComponent/>
            <h1 className="text-2xl mt-4 ml-4 font-semibold">Crea un Prodotto</h1>
            <ProductForm setImgIsChanged={null} handleSubmit={handleSubmit} hiddenStatus={true} />
        </div>
    )
}

