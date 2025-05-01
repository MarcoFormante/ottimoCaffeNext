import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    const product = await req.json()
    const supabase = await createClient()
    const {error} = await supabase.from("products").update(product).eq("id",product.id)

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
        
    if (error) {
        const constraintKey =  checkKeys(error.message)
        return  NextResponse.json({success:false,error:{message:error.message,constraint:constraintKey}},{
            status:500
        })
    }
  
    return NextResponse.json({success:true,message:"Prodotto modificato con successo"},{
        status:200
    })
    
    
    
}