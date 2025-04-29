import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const searchValue = await req.json()
    
    if (!searchValue) {
        return 
    }
    const supabase = await createClient()

    const {data,error,count} = await supabase.from("products").select("*",{count:"exact"})
    .or(
         `name.ilike.%${searchValue}%,category.ilike.%${searchValue}%,slug.ilike.%${searchValue}%,code.ilike.%${searchValue}%,description.ilike.%${searchValue}%`
    )
  
    if (error) {
        return NextResponse.json({success:false,errorMessage:"Nessun Prodotto Trovato"},{status:400})
    }

    if (data) {
        return NextResponse.json({success:true,errorMessage:"",products:data,totalProducts:count},{status:200})
    }
}