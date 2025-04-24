'use server'

import {z} from "zod"
import { createClient } from '@/app/utils/supabase/server'
import { redirect } from "next/navigation"


export async function login(state: string | null, formData: FormData): Promise<string | null > {
  try {
    const supabase = await createClient()
    const dataObject = z.object({
      email:z.string().email().min(5),
      password:z.string().min(6)
    })

    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const dataParsed = dataObject.safeParse(data)

    if (!dataParsed.success) {
      throw new Error("Invalid email or password format");
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    
    if (error)  return error.message
    return null
    
} catch(error){
      return "Error during Login, try again" + error
}
}

  

export async function logout(){
    const supabase = await createClient()
     const {error} = await supabase.auth.signOut()
     if (!error) {
        redirect("/")
     }
}

