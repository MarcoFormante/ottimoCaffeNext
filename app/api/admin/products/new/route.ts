import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";




export  async function POST(req:NextRequest){
    const product:ProductCardProps = await req.json()
    console.log(product);
    
    if (!product) {
       return  NextResponse.json({success:false,message:"Compila tutti i campi"},{
        status:500
       })
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
    
    const dateValue = Date.now().toString()
    const supabase = await createClient()

    const newProduct = {
        name:product.name,
        image_url:"img-" + dateValue,
        description:product.description,
        category:product.category,
        code:product.code,
        slug:product.slug,
        price:product.price,
        active:true,
        stripe_product_id:dateValue,
        stripe_price_id:"price-" + dateValue,
        offer:product.offer
    }
    const {error} = await supabase.from("products").insert(newProduct)

    if (error) {
        const constraintKey =  checkKeys(error.message)
        
        return  NextResponse.json({success:false,error:{message:error.message,constraint:constraintKey}},{
            status:500
        })
    }
  

    return  NextResponse.json({success:true,message:"Prodotto creato con successo"},{
        status:200
    })

}  