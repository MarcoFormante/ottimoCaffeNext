import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    const id = await req.json()
    
    if (!id) {
        return NextResponse.json({success:false,error:{message:"ID prodotto mancante"}},{
            status:500
        })
    }

    const supabase =  await createClient()
    const {error} = await supabase.from("products").delete().eq("id",id)
    
    if (error) {
        return NextResponse.json({success:false,error:{message:"Errore durante l'eliminazione del prodotto"}},{
            status:500
        })
    }

    return NextResponse.json({success:true,message:"Prodotto eliminato con successo"},{
        status:200
    })
    
}