import { createClient } from "@/app/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const supabase = await createClient()
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
   
    const session = (await supabase.auth.getSession()).data.session

    if (session) {
       const {error} = await supabase.auth.signOut()
        if (error) {
            throw new Error("Error during LOGOUT")
        }
    }   
     
    allCookies.forEach((c)=>{
        cookieStore.set(c.name,"",{ path: "/", maxAge: -1 })
    })

    return NextResponse.redirect(new URL("/login",req.url),{
        status:302,
    })

}