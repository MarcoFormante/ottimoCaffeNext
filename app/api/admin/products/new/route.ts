import { stripe } from "@/app/lib/stripe";
import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export  async function POST(req:NextRequest){
    try {
        const formdata = await req.formData()
        const product = JSON.parse(formdata.get("product") as string)
        const img = formdata.get("img")
        
    if (!product || !img) {
       return  NextResponse.json({success:false,message:"Compila tutti i campi obbligatori"},{
        status:500
       })
    }
    const imagePath:string = `img-${product.code}_${Date.now()}`

    function checkKeys(error:string){
        const possibleViolateKeys = ["products_slug_key","products_image_url_key","products_code_key",]
        const keyErrors={
            "products_slug_key":{message:"Lo slug del prodotto esiste già",type:"slug"},
            "products_image_url_key":{message:"L'url dell'immagine esiste già",type:"image_url"},
            "products_code_key":{message:"Il codice del prodotto è stato già utilizzato",type:"code"}
        }
        let key = null;
        possibleViolateKeys.forEach((k)=>{
            if (error.includes(k)) {
                key = (keyErrors[k as keyof typeof keyErrors])
            }
        })
        return key
    }
    
    const supabase = await createClient()
        


    const stripeProduct = await stripe.products.create({
            name: product.name,
            description: product.description || "ottimo caffè - " + product.name,
      })



      if (!stripeProduct.id) {
        return NextResponse.json({success:false,error:{message:"Errore durante la creazione del prodotto su Stripe"}},{
            status:500
        })
      }



      const price = await stripe.prices.create({
        product:stripeProduct.id,
        unit_amount: (product.offer || product.price) * 100, // Convert to cents
        currency: "eur",
      })
      


      if (!stripeProduct.id || !price.id) {
        return NextResponse.json({success:false,error:{message:"Errore durante la creazione del prodotto su Stripe"}},{
            status:500
        })
      }

      const newProduct = {
        name:product.name,
        image_url:imagePath,
        description:product.description,
        category:product.category,
        code:product.code,
        slug:product.slug,
        price:product.price,
        active:true,
        offer:product.offer,
        stripe_product_id: stripeProduct.id,
        stripe_price_id: price.id,
    }


    const {error,data} = await supabase.from("products").insert(newProduct).select("id")
    
    if (error) {
        const constraintKey =  checkKeys(error.message)
        
        return  NextResponse.json({success:false,error:{message:error.message,constraint:constraintKey}},{
            status:500
        })
    }

    const productID = data[0].id

    const {error:imageError} = await supabase.storage.from("products.images").upload(imagePath,img as File,{
        cacheControl:"5",
    })
    
    if (imageError) {
        await supabase.from("products").delete().eq("id",productID)
        return  NextResponse.json({success:false,error:{message:"Errore durante la modifica dell'immagine"}},{
            status:500
        })
    }else{
        

        return  NextResponse.json({success:true,message:"Prodotto creato con successo"},{
            status:200
        })
    }

    } catch (error) {
        console.log(error);
        
        return  NextResponse.json({success:false,error:{message:error}},{
            status:500
        })
    }
    

}  