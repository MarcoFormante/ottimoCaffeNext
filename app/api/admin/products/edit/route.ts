import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    const formdata = await req.formData()
    const supabase = await createClient()

    const product = JSON.parse(formdata.get("product") as string)
    const imgIsChanged = formdata.get("imgIsChanged")
    const img = formdata.get("img")
    let newImageUrl:string ;
    const lastImageUrl:string = product.image_url;

    if (!product) {
        return  NextResponse.json({success:false,error:{message:"Errore durante la modifica del prodotto"}},{
            status:400
        })
    }

    if (Boolean(imgIsChanged) && !img) {
        return  NextResponse.json({success:false,error:{message:"Errore durante la modifica del prodotto: Problema con l'immagine"}},{
            status:400
        })
    }else if(Boolean(imgIsChanged) && img) {
        newImageUrl = `img-${product.code}_${Date.now()}`
        product.image_url = newImageUrl
    }


     function checkKeys(error:string){
        const possibleViolateKeys = ["products_slug_key","products_image_url_key","products_code_key",]
        const keyErrors={
            "products_slug_key":{message:"Lo slug del prodotto esiste già",type:"slug"},
            "products_image_url_key":{message:"L'url dell'immagine esiste già",type:"image_url"},
            "products_code_key":{message:"Il codice del prodotto è stato già utilizzato",type:"code"}
        }
        let key = null;
        possibleViolateKeys.forEach((k)=>{
            if (error.includes(k)) {
                key = (keyErrors[k as keyof typeof keyErrors])
            }
        })
        return key
    }
    

    const {error} = await supabase.from("products").update(product).eq("id",product.id)

        
    if (error) {
        const constraintKey = checkKeys(error.message)
        return  NextResponse.json({success:false,error:{message:error.message,constraint:constraintKey}},{
            status:500
        })
    }

    if (Boolean(Number(imgIsChanged))) {
        const {error:errorImg} = await supabase.storage.from("products.images").update(product.image_url,img as File,{
            upsert:true,
        })
        
        if (errorImg) {
            return  NextResponse.json({success:false,error:{message:"Errore durante la modifica del prodotto: Problema con l'immagine"}},{
                status:400
            })
        }
        const {error:errorRemoveLastImage} = await supabase.storage.from("products.images").remove([lastImageUrl])

        if (errorRemoveLastImage) {
            await supabase.storage.from("products.images").remove([product.image_url])
            await supabase.from("products").update({image_url:lastImageUrl}).eq("id",product.id).single()
        }
    }

  
    return NextResponse.json({success:true,message:"Prodotto modificato con successo"},{
        status:200
    })
    
    
    
}