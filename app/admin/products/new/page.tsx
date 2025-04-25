'use client'

import ProductCard, { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import Image from "next/image"
import { FormEvent, useState } from "react"
import debounce from "debounce"

export default function NewProduct(){
    const [openViewCards,setOpenViewCards] = useState(false)
    const [product,setProduct] = useState<ProductCardProps & {img:File}| null>({
        id:"",
        name:"",
        price: "",
        description: "",
        category: "",
        code: "",
        img: null as unknown as File,
        active: true,
        stripe_price_id: "",
        stripe_product_id: "",
        slug: "",
        offer: "",
        image_url:""
    })

    function handleInputs(e:FormEvent){
        const input = e.target as HTMLInputElement
        if (!product) return
        const newProduct = {...product}
        if (input.type === 'file' && input.files) {
            newProduct.img = input.files[0]
        } else {
            const key = input.id as keyof typeof product
            if (key in product) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (newProduct as any)[key] = input.value
            }
        } 
        setProduct(newProduct as ProductCardProps & {img: File})
       
    }

   
    return (
        <div className="pb-20">
            <h1 className="text-2xl mt-4 ml-4 font-semibold">Crea un Prodotto</h1>
            <form 
            className="mt-10  p-10 " 
            onChange={debounce((e)=>handleInputs(e),300)}
            >
                <div className="flex flex-row justify-center gap-20  max-md:gap-0 max-md:flex-col  max-md:items-center">

                    <div className="border p-15 max-md:p-5  flex flex-col gap-7 min-w-[350px] w-[500px] max-md:border-none">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold">Nome</label>
                            <input required className="border rounded p-2" type="text" id="name" placeholder="Nome prodotto" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="img" className="font-semibold">Immagine</label>
                            <input required className="border rounded p-2" type="file" id="img"  />
                            <div className="mt-2 w-[100px] h-[100px] m-auto">
                                {product?.img && <Image  width={100} height={100} src={URL.createObjectURL(product.img)} alt=""/>}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="slug" className="font-semibold">Slug</label>
                            <input required className="border rounded p-2" type="text" id="slug" placeholder="Slug Prodotto" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="category" className="font-semibold">Categoria</label>
                            <input required className="border rounded p-2" type="text" id="category" placeholder="Scegli categoria" />
                        </div>
                    </div>


                    <div className="border p-15 max-md:p-5 flex flex-col gap-7 min-w-[350px] w-[500px]  max-md:border-none">
                        <div className="flex flex-col">
                            <label htmlFor="code" className="font-semibold">Codice</label>
                            <input required className="border rounded p-2" type="text" id="code" placeholder="Codice prodotto" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="price" className="font-semibold">Prezzo</label>
                            <input required className="border rounded p-2" type="text" id="price" placeholder="Scegli il Prezzo (ex. 9.00)" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="offer" className="font-semibold">Offerta</label>
                            <input required className="border rounded p-2" type="text" id="offer" placeholder="Scegli il Prezzo Scontato (opzionale)" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="description" className="font-semibold">Descrizione</label>
                            <textarea className="border rounded p-2" id="description" placeholder="Scrivi una descrizione (opzionale)" />
                        </div>
                      
                    </div>
                </div>
            </form>

            <div
            onClick={()=>setOpenViewCards(!openViewCards)} 
                className="fixed bottom-10 right-10 text-white border px-5 py-5 w-5 h-5 rounded-4xl flex justify-center items-center">
                ?
            </div>
            <div className='flex justify-center' hidden={openViewCards}>
             <ProductCard 
                        id={""}
                        name={product?.name || ""}
                        description={product?.description || ""}
                        price={product?.price || ""}
                        image_url={product?.img ? URL.createObjectURL(product.img) : ""}
                        category={product?.category || ""}
                        code={product?.code || ""}
                        slug={product?.slug || ""}
                        offer={product?.offer || ""}
                        active={product?.active || true}
                        stripe_price_id={product?.stripe_price_id || ""}
                        stripe_product_id={product?.stripe_product_id || ""}
                        hideDetails={true}
                />
            </div>
                

        </div>
    )
}

