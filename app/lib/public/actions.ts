"use server"

import { createClient } from "@/app/utils/supabase/server"

export async function getProductsByCategory(category:string){
    try {
        const supabase = await createClient()

        const {data,error} = 
                category === "in-promozione" ? 
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description,active")
                    .neq("offer","")
                    .neq("active",false)

                : category === "tutti-i-prodotti" ? 
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description,active")
                    .neq("active",false)
                :  
                    await supabase.from("products")
                    .select("id,slug,name,image_url,category,code,price,offer,description,active")
                    .eq("category",category)
                    .neq("active",false)

        
        if (error) {
            return {success:false,error:"errore durante il recupero dei prodotti"}
        }
    
        return {success:true,products:data,error:false}
        

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
         return {success:false,error:"errore durante il recupero dei prodotti"}
    }
   
}