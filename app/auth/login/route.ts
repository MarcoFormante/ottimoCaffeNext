
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req:NextRequest){
    try {
    const formData = await req.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    
    if (!email || !password) {
        throw new Error("email and Password are Required");
    }
    
    const dataObject = z.object({
      email:z.string().email({message:"L'email non è corretta"}).min(5),
      password:z.string().min(6).max(60)
    })

    const dataParsed = dataObject.safeParse({
        email,
        password
    })
    

    if (!dataParsed.success) {
        return NextResponse.json({success:false,errorMessage:"Email and Password formats are not corrects"},{
            status:400
        })
    }

    const supabase = await createClient()
    const {error} = await supabase.auth.signInWithPassword({email,password})
    
    if (error && error?.status === 400) {
        return NextResponse.json({success:false,errorMessage:"Invalid Credentials"},{
            status:400
        })
    }

    if (!error) {
        revalidatePath("/","layout")
        
        return NextResponse.json({success:true},{
            status:200
        })
    }
    
    } catch (error) {
         return NextResponse.json({success:false,errorMessage:"Invalid Credentials"},{
            status:400
        })
    }
   

}