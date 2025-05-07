import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const supabase = await createClient()
        const {data,error} = await supabase.from("products").select("id,slug,name,image_url,category,code,price,offer").neq("offer","").eq("active",true).order("offer",{ascending:false}).limit(3)
        if (error) {
            return NextResponse.json({success:false,error:"Errore durante il recupero dei prodotti in promozione"},{
                status:400
            })
        }
        return NextResponse.json({success:true,products:data},{
            status:200
        })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch (error) {
        return NextResponse.json({success:false,error:"Errore durante il recupero dei prodotti in promozione : in-catch"},{
            status:500
        })
    }
}