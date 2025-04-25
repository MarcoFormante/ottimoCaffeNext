import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/app/utils";

export async function POST(req:NextRequest){
    const params = await req.json()
    const isValidCategory = categories.find((c)=>c.href.replace("/","") === params.categoria)
    if (!isValidCategory) {
        return NextResponse.json({success:false,errorMessage:"Category not Valid"},{
            status:400
        })
    }
    let categoria = ""
    let value = ""
    if (params.categoria !== "tutti-i-prodotti") {
        categoria = "category"
        value = params.categoria
    }
    
    const supabase = await createClient()

    const {data,error,count} = await supabase.from("products").select("*",{count:"exact"}).eq(categoria,value).range((params.page - 1 )* 10,params.page * 9)

    if (error) {
        return NextResponse.json({success:false,errorMessage:"Errore durante la ricerca dei prodotti" + error.message},{
            status:400
        })
    }
    if (data) {
        return NextResponse.json({success:true,products:data,totalProducts:count},{
            status:200
        })
    }

  
}