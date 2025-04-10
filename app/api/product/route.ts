import { getProduts } from "@/app/actions/products";
import { isProduction } from "@/app/helpers";
import { NextResponse } from "next/server";

export  async function GET(){
    
    try {
        const result = await getProduts()
        return NextResponse.json(result,{status:200})
    } catch (error) {
        if (!isProduction) {
            console.error(error)
        }
        return NextResponse.json({error:"Error"},{status:500})
    }
   
}