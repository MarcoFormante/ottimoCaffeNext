import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){
    const product = await req.json()
    console.log(product);
    const supabase = await createClient()
    const {error} = await supabase.from("products").update(product).eq("id",product.id)
    console.log("errore",error);
        
    if (error) {
       return  NextResponse.json(error,{
            status:500
        })
    }
  
    return NextResponse.json({success:true,message:"Prodotto modificato con successo"},{
        status:200
    })
    
    
    
}