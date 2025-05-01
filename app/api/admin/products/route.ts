import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/app/utils";

export async function POST(req:NextRequest){
    const params = await req.json()
    const supabase = await createClient()

    if (params.search) {
        const {data,error,count} = await supabase.from("products").select("*",{count:"exact"})
        .or(
            `name.ilike.%${params?.search}%,category.ilike.%${params?.search}%,slug.ilike.%${params?.search}%,code.ilike.%${params?.search}%,description.ilike.%${params?.search}%`
        ).range((params.page - 1 ) * 10,(params.page * 10) - 1)
        .order("price") 
  
        if (error) {
            return NextResponse.json({success:false,errorMessage:"Nessun Prodotto Trovato"},{status:400})
        }

        if (data) {
            return NextResponse.json({success:true,errorMessage:"",products:data,totalProducts:count},{status:200})
        }
    }
    
    
    const isValidCategory = categories.find((c)=>c.href.replace("/","") === params.categoria)
    if (!isValidCategory) {
        return NextResponse.json({success:false,errorMessage:"Category not Valid"},{
            status:400
        })
    }
    
    if (!params.page.match(/[0-9]/)) {
        return NextResponse.json({success:false,errorMessage:"Page not Valid"},{
            status:400
        })
    }
    
    
 

    const {data,error,count} = params.categoria === "tutti-i-prodotti" 
    ? await supabase.from("products").select("*",{count:"exact"}).range((params.page - 1 ) * 10,(params.page * 10) - 1).order("price") 
    : params.categoria === "in-promozione" ? await supabase.from("products").select("*",{count:"exact"}).neq("offer","").range((params.page - 1 ) * 10,(params.page * 10) - 1).order("offer")
    : await supabase.from("products").select("*",{count:"exact"}).eq("category",params.categoria).range((params.page - 1 ) * 10,(params.page * 10) - 1).order("price")
    
    
    if (error) {
        return NextResponse.json({success:false,errorMessage:"Errore durante la ricerca dei prodotti" + error.message},{
            status:500
        })
    }
    
        return NextResponse.json({success:true,products:data,totalProducts:count},{
            status:200
        })
    

  
}