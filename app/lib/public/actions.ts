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




export async function getProductDetails(slug:string){
       try {
        if (!slug) {
            throw new Error("Errore durante la richiesta del prodotto: Slug inesistente")
        }
        
        const supabase = await createClient()
    
        const {data,error} = await supabase.from("products")
        .select("id,name,image_url,description,slug,category,code,price,offer,active,kit")
        .eq("active",true)
        .eq("slug",slug)
        .single()
    
        if (error || !data) {
             throw new Error("Errore durante la richiesta del prodotto")
        }
    
         return {success:true,product:data,error:false}
    
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {success:false,error:{message:"Errore durante la richiesta del prodotto"},product:false}
        }

}




export async function getHomeProducts(){
    try {
        const supabase = await createClient()
        const {data,error} = await supabase.from("products")
        .select("id,slug,name,image_url,category,code,price,offer,description,active")
        .neq("offer","")
        .eq("active",true)
        .order("offer",{ascending:false})
        .limit(3)

        if (error || !data) {
            throw new Error("Errore durante la richiesta dei prodotti in promozione")
        }

        return {success:true,products:data,error:false}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {success:false,error:{message:"Errore durante la richiesta dei prodotti in promozione"},products:false}
    }
}




export async function searchProducts(search:string){
    try {
        const supabase = await createClient()
        const {data,error} = await supabase.from("products")
        .select("id,name,category,slug,price,offer,description,image_url")
        .or(`description.ilike.%${search}%,name.ilike.%${search}%,code.ilike.%${search}%`)

        if (error || !data.length) {
            throw new Error("Nessun prodotto trovato");
        }
    
        return {success:true,products:data,error:false}

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {success:false,error:{message:"Errore durante la ricerca dei prodotti"},products:false}
    }
    

}