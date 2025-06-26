'use client'

import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import { FormEvent} from "react"
import ProductForm from "@/app/components/Admin/ProductForm/ProductForm"
import useAlert from "@/app/hooks/useAlert"


export default function NewProduct(){
    const {AlertComponent,setAlert} = useAlert()

  
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
                if (data.success) {
                    setAlert({message:data.message,color:"bg-green-500"})
                    return true
                }else{
                    if (data.error.constraint.type) {
                       setAlert({message:"Errore durante la creazione del Prodotto : " + data.error.constraint.message,color:"bg-red-500"})
                       return false
                    }
                     setAlert({message:"Errore durante la creazione del Prodotto : " + data.error.message,color:"bg-red-500"})
                     return false
                }
            } catch (error) {
                setAlert({message:"Errore durante la creazione del Prodotto : " + error,color:"bg-red-500"})
                 return false
            }
       }

   
    return (
        <div className="pb-20" >
             <AlertComponent style={"max-w-full"}/>
            <h1 className="text-2xl mt-4 ml-4 font-semibold">Crea un Prodotto</h1>
            <ProductForm setImgIsChanged={null} handleSubmit={handleSubmit} hiddenStatus={true} />
        </div>
    )
}

