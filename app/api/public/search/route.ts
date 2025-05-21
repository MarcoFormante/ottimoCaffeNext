import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const text = req.nextUrl.searchParams.get("text")
    if (!text) {
        return NextResponse.json({success:true,products:[]},{
            status:200
    })
    }
    const supabase = await createClient()
    const {data,error} = await supabase.from("products")
    .select("name,category,slug,price,offer,description,image_url")
    .or(`description.ilike.%${text}%,name.ilike.%${text}%,code.ilike.%${text}%`)
    
        if (error) {
            return NextResponse.json({success:false,products:[]},{
            status:500
        })
    }
    
    return NextResponse.json({success:true,products:data},{
        status:200
    })
}
