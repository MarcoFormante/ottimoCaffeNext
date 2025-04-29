import Image from "next/image"
import { FormEvent, useState } from "react"
import { ProductCardProps } from "../../common/ProductCard/ProductCard"
import { categories } from "@/app/utils"


interface ProductFormProps{
    handleSubmit:(e:FormEvent,product:ProductCardProps)=>Promise<void>,
    productProps?:(ProductCardProps & {img:File | null}) | null,
    hiddenStatus?:boolean
}


export default function ProductForm({handleSubmit,productProps = null,hiddenStatus = false}:ProductFormProps){
     const [product,setProduct] = useState(productProps ?? {
            id:"",
            name:"",
            price: "",
            description: "",
            category: "",
            code: "",
            img: null as unknown as File,
            active: false,
            slug: "",
            offer: "" ,
            image_url:""
        })


    return (
        <form className="mt-10 p-10" onSubmit={(e)=>handleSubmit(e,product)}>
                                <div className="flex flex-row justify-center gap-20  max-md:gap-0 max-md:flex-col  max-md:items-center">
                
                                    <div className="border p-15 max-md:p-5  flex flex-col gap-7 min-w-[350px] w-[500px] max-md:border-none">
                                        <div className="flex flex-col">
                                            <label htmlFor="name" className="font-semibold">Nome</label>
                                            <textarea required className="border rounded p-2" id="name" placeholder="Nome prodotto" value={product?.name} onChange={(e)=>setProduct({...product,name:e.target.value})} />
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="img" className="font-semibold">Immagine</label>
                                            <input required={!product.img && !product.image_url } className="border rounded p-2" type="file" id="img" onChange={(e)=>{
                                                if (e.target.files && e.target.files[0]) {
                                                    setProduct({...product,img:e.target.files[0] })
                                                }
                                                }}  
                                            />
                                            <div className="mt-2 w-[100px] h-[100px] m-auto">
                                                {product?.img ? <Image priority width={100} height={100} src={URL.createObjectURL(product?.img)} alt="" /> 
                                                    : product?.image_url ? <Image priority width={100} height={100} src={`/assets/images/products/${product?.image_url}`} alt="" /> 
                                                    : null
                                                    }
                                            </div>
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="slug" className="font-semibold">Slug</label>
                                            <input required className="border rounded p-2" type="text" id="slug" placeholder="Slug Prodotto" value={product?.slug} onChange={(e)=>setProduct({...product,slug:e.target.value})} />
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="category" className="font-semibold">Categoria</label>
                                              <select required className="border rounded p-2" id="category" value={product?.category}  onChange={(e)=>setProduct({...product,category:e.target.value})}  >
                                                      {categories.map((c)=>{
                                                          const value = c.href.replace("/","")
                                                          const valuesNotAllowed = ["in-promozione","tutti-i-prodotti"]
                                                          return !valuesNotAllowed.includes(value) && <option key={c.href} value={value}>{c.nameInNav}</option>
                                                      })}
                                                </select>      
                                        </div>
                                    </div>
                
                                    <div className="border p-15 max-md:p-5 flex flex-col gap-7 min-w-[350px] w-[500px]  max-md:border-none">
                                        <div className="flex flex-col">
                                            <label htmlFor="code" className="font-semibold">Codice</label>
                                            <input required className="border rounded p-2" type="text" id="code" placeholder="Codice prodotto" value={product?.code} onChange={(e)=>setProduct({...product,code:e.target.value})}  />
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="price" className="font-semibold">Prezzo</label>
                                            <input required className="border rounded p-2" type="text" id="price" value={product?.price} placeholder="Scegli il Prezzo (ex. 9.00)" onChange={(e)=>setProduct({...product,price:e.target.value})} />
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="offer" className="font-semibold">Offerta</label>
                                            <input className="border rounded p-2" type="text" id="offer"  placeholder="Scegli il Prezzo Scontato (opzionale)" value={product?.offer as string} onChange={(e)=>{
                                                setProduct({...product,offer: e.target.value ?? null})
                                            }} />
                                        </div>
                
                                        <div className="flex flex-col">
                                            <label htmlFor="description" className="font-semibold">Descrizione</label>
                                            <textarea className="border rounded p-2" id="description" placeholder="Scrivi una descrizione (opzionale)" value={product?.description || ""} onChange={(e)=>setProduct({...product,description:e.target.value})} />
                                        </div>
        
                                       {!hiddenStatus &&  <div className="flex flex-col">
                                            <label htmlFor="status" className="font-semibold">Stato</label>
                                            <div>
                                                <input type="checkbox" className="self-baseline" id="status" checked={product?.active} onChange={(e)=>setProduct({...product,active:e.target.checked})}  /> 
                                                <span className={`ml-3 px-3 text-white ${product?.active ? "bg-green-600 ":"bg-red-600 "}`}>{product?.active ? "Attivo" : "NON attivo"}</span>
                                            </div>
                                        </div>}
                
                                        <div className="mt-2">
                                            <button className="bg-black text-white w-[100px] p-3 rounded-lg cursor-pointer border font-bold transition hover:text-black hover:bg-transparent hover:border">Salva</button>
                                        </div>
                                      
                                    </div>
                                </div>
                            </form>
    )
}