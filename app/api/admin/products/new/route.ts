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
        return  NextResponse.json({success:false,message:"Errore durante la creazione del Prodotto",error:error.message},{
            status:500
        })
    }

    return  NextResponse.json({success:true,message:"Prodotto creato con successo"},{
        status:200
    })

}  