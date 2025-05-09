import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    try {
        const {product} = await req.json()
        
        if (!product.id || !product.image_url) {
            return NextResponse.json({success:false,error:{message:"ID o Immagine del prodotto mancante"}},{
                status:500
            })
        }
    
        const supabase =  await createClient()
        const {error:errorNewProduct} = await supabase.from("products").delete().eq("id",product.id)
        
        if (errorNewProduct) {
            return NextResponse.json({success:false,error:{message:"Errore durante l'eliminazione del prodotto"}},{
                status:500
            })
        }

        const {error:errorImage} = await supabase.storage.from("products.images").remove([product.image_url])
      
        if (errorImage) {
            const {error:errorReinsertProduct} = await supabase.from("products").insert(product)
            if (errorReinsertProduct) {
                throw new Error(errorReinsertProduct.message)
            }else{
                  return NextResponse.json({success:true,message:"Prodotto Reinserito, problema con l'eliminazione dell'immagine"},{
                    status:200
                })
            }

        }
    
        return NextResponse.json({success:true,message:"Prodotto eliminato con successo"},{
            status:200
        })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({success:false,error:{message:"Errore durante l'eliminazione del prodotto"}},{
            status:500
        })
    }
   
    
}