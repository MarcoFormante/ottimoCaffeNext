import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams
        const category = searchParams.get("category")


        const supabase = await createClient()

        const {data,error} = 
                category === "in-promozione" ? 
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description")
                    .neq("offer","")
                    .neq("active",false)

                : category === "tutti-i-prodotti" ? 
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description")
                    .neq("active",false)
                :  
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description")
                    .eq("category",category)
                    .neq("active",false)

        
        if (error) {
            return NextResponse.json({success:false,error:"errore durante il recupero dei prodotti"},{
            status:400
            })
        }
    
        return NextResponse.json({success:true,products:data},{
            status:200
        })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
         return NextResponse.json({success:false,error:"errore durante il recupero dei prodotti"},{
            status:500
        })
    }
   
}

