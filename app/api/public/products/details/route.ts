import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
   
    try {
    const slug = req.nextUrl.searchParams.get("slug")
    
    if (!slug) {
        throw new Error("slug prodotto mancante durante la richiesta")
    }
    
    const supabase = await createClient()

    const {data,error} = await supabase.from("products").select("name,image_url,description,slug,category,code,price,offer").eq("active",true).eq("slug",slug).single()

    if (error || !data) {
         throw new Error("Errore durante la richiesta del prodotto")
    }

     return NextResponse.json({success:true,product:data},{
        status:200
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
         return NextResponse.json({success:false,error:{message:"Errore durante la richiesta del prodotto"}},{
                status:500
            })
    }
   
}