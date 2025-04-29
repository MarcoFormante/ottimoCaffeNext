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
    
    
    const supabase = await createClient()

    const {data,error,count} = params.categoria === "tutti-i-prodotti" 
    ? await supabase.from("products").select("*",{count:"exact"}).range((params.page - 1 )* 10,params.page * 9) 
    : params.categoria === "in-promozione" ? await supabase.from("products").select("*",{count:"exact"}).not("offer","is",null).range((params.page - 1 )* 10,params.page * 9) 
    : await supabase.from("products").select("*",{count:"exact"}).eq("category",params.categoria).range((params.page - 1 )* 10,params.page * 9)


    if (error) {
        return NextResponse.json({success:false,errorMessage:"Errore durante la ricerca dei prodotti" + error.message},{
            status:500
        })
    }
    
        return NextResponse.json({success:true,products:data,totalProducts:count},{
            status:200
        })
    

  
}