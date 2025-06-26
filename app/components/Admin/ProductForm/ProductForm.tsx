import Image from "next/image"
import { FormEvent, useMemo, useRef, useState } from "react"
import { ProductCardProps } from "../../common/ProductCard/ProductCard"
import { CATEGORIES } from "@/app/utils/helpers/constants";
import ProductPreview from '../ProductPreview/ProductPreview';

interface ProductFormProps{
    handleSubmit:(e:FormEvent,product:ProductCardProps,img:File)=>Promise<boolean>,
    productProps?:ProductCardProps  | null,
    hiddenStatus?:boolean,
    setImgIsChanged?:React.Dispatch<React.SetStateAction<boolean>> | null
}

const initialState = {
    id:"",
    name:"",
    price: "",
    description: "",
    category: "caffe-in-cialde",
    code: "",
    active: true,
    slug: "",
    offer: "" ,
    image_url:"",
    kit: [{ quantity: "1", text: "", price:"0"}] 
}


export default function ProductForm({handleSubmit,productProps = null,hiddenStatus = false,setImgIsChanged = null}:ProductFormProps){
     const [product,setProduct] = useState(productProps ?? initialState)
        const [isPreview,setIsPreview] = useState(false)
        const [img,setImg] = useState<File | null >(null)
        const inputFileRef = useRef<HTMLInputElement>(null)
        const [kit,setKit] = useState([...product.kit ||[{ quantity: "1", text: "", price:""}]])

        const imagePreviewUrl = useMemo(() => {
            if (img) {
              return URL.createObjectURL(img);
            }
            if (product?.image_url) {
              return `http://127.0.0.1:20162/storage/v1/object/public/products.images//${product.image_url}`;
            }
            return null;
          }, [img, product?.image_url]);


        async function submit(e:FormEvent){
          e.preventDefault()
          const isKit = product.category === "kit"
          const prod = isKit ? {...product,kit} : product 
          if (isKit) {
             const price = ()=>{
                let total = 0
                    prod?.kit?.forEach((p,i)=> {
                        if (!+p.price && i < 2) {
                             throw new Error("Prezzo non valido")
                        }else{
                            total += +p.price
                            setProduct(prev => ({...prev,price:total.toString()}))
                        }
                    })
                    return total
            }

            prod.price = price().toString()
          }
          
          const success = await handleSubmit(e,prod,img as File)
          if (success) {
               setProduct(initialState)
               setImg(null)
               if (inputFileRef.current) {
                inputFileRef.current.value = ""
               }
          }
        }



        function handleImgChange(e:React.ChangeEvent<HTMLInputElement>){
            if (e.target.files && e.target.files[0]) {
                setImg(e.target.files[0])
                if (setImgIsChanged !== null) {
                    setImgIsChanged(true)
                }
            }
        }






    return (
            <div>
                <form className="mt-10 p-10" onSubmit={async (e)=>submit(e)}>
                        <div className="flex flex-row justify-center gap-20  max-md:gap-0 max-md:flex-col  max-md:items-center">
                            <div className="border p-15 max-md:p-5  flex flex-col gap-7 min-w-[350px] w-[500px] max-md:border-none">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="font-semibold">Nome</label>
                                    <textarea required className="border rounded p-2" id="name" placeholder="Nome prodotto" value={product?.name} onChange={(e)=>setProduct(prev => ({...prev,name:e.target.value}))} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="img" className="font-semibold">Immagine</label>
                                    <input ref={inputFileRef} required={!img && !product.image_url } className="border rounded p-2" type="file" id="img"  onChange={handleImgChange}  
                                    />
                                    <div className="mt-2 w-[100px] h-[100px] m-auto">
                                        {imagePreviewUrl  && <Image width={100} height={100} src={imagePreviewUrl} alt="" /> }
                                    </div>
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="slug" className="font-semibold">Slug</label>
                                    <input required className="border rounded p-2" type="text" id="slug" placeholder="Slug Prodotto" value={product?.slug} onChange={(e)=>setProduct(prev => ({...prev,slug:e.target.value}))} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="category" className="font-semibold">Categoria</label>
                                    <select required className="border rounded p-2" id="category" value={product?.category} onChange={(e)=>setProduct(prev => ({...prev,category:e.target.value}))}  >
                                            {CATEGORIES.map((c)=>{
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
                                    <input required className="border rounded p-2" type="text" id="code" placeholder="Codice prodotto" value={product?.code} onChange={(e)=>setProduct(prev=>({...prev,code:e.target.value}))}  />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="price" className="font-semibold">Prezzo</label>
                                    <input disabled={product.category.toLowerCase() === "kit"} required className="border rounded p-2 disabled:opacity-15" type="text" id="price" value={product.price} placeholder="Scegli il Prezzo (ex. 9.00)" onChange={(e)=>setProduct(prev=>({...prev,price:e.target.value}))} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="offer" className="font-semibold">Offerta</label>
                                    <input className="border rounded p-2" type="text" id="offer"  placeholder="Scegli il Prezzo Scontato (opzionale)" value={product?.offer as string} onChange={(e)=>{
                                        setProduct(prev => ({...prev,offer: e.target.value ?? null}))
                                    }} />
                                </div>
        
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="font-semibold">Descrizione</label>
                                    <textarea className="border rounded p-2" id="description" placeholder="Scrivi una descrizione (opzionale)" value={product?.description || ""} onChange={(e)=>setProduct(prev=>({...prev,description:e.target.value}))} />
                                </div>

                                {!hiddenStatus &&  <div className="flex flex-col">
                                    <label htmlFor="status" className="font-semibold">Stato</label>
                                    <div>
                                        <input type="checkbox" className="self-baseline" id="status" checked={product?.active} onChange={(e)=>setProduct(prev=>({...prev,active:e.target.checked}))}  /> 
                                        <span className={`ml-3 px-3 text-white ${product?.active ? "bg-green-600 ":"bg-red-600 "}`}>{product?.active ? "Attivo" : "NON attivo"}</span>
                                    </div>
                                </div>}
        
                                {product.category !== "kit" && <div className="mt-2">
                                    <button className="bg-black text-white w-[100px] p-3 rounded-lg cursor-pointer border font-bold transition hover:text-black hover:bg-transparent hover:border">Salva</button>
                                </div>}
                            
                            </div>


                            {product.category === "kit" && kit &&  <div className="border p-15 max-md:p-5 flex flex-col gap-7 min-w-[350px] w-[500px]  max-md:border-none">
                                <div className="flex flex-col">
                                    <label htmlFor="isKit" className="font-semibold">E&lsquo; un KIT</label>
                                    <input type="checkbox" className="self-baseline scale-150 mt-2" id="isKit" checked readOnly  />
                                </div>
                                
                                <div className={`flex flex-col gap-4`}>
                                <div className="flex flex-col">
                                    <label htmlFor="kitElement1" className="font-semibold">Primo Elemento</label>
                                    <div className="flex gap-2 ">
                                      <input type="number" className="w-15 text-center border rounded-sm" id="kitElement1-quantity" value={kit[0]?.quantity || 1} min={1} onChange={(e) => {
                                        const newKitElements = [...(kit || [])];
                                        newKitElements[0] = { ...kit[0], quantity: e.target.value };
                                        setKit(newKitElements);
                                      }} />  

                                      <input required  className="border rounded p-2 w-full" type="text" id="kitElement1-text" value={ kit[0]?.text || ""} placeholder="descrizione (Obbligatorio)" onChange={(e)=>{
                                        const newKitElements = [...(kit || [])]
                                        newKitElements[0] = ({...kit[0],text:e.target.value})
                                        setKit(newKitElements);
                                    }} />

                                        <input type="text" id="kitElement1-price" required className="w-15 text-center border rounded-sm" placeholder="Prezzo"  value={kit[0]?.price || ""} onChange={(e)=>{
                                            const newKitElements = [...(kit || [])]
                                            newKitElements[0] = ({...kit[0],price:e.target.value})
                                            setKit(newKitElements);
                                        }}  />  
                                    </div>
                                  
                                </div>

                                 <div className="flex flex-col">
                                    <label htmlFor="kitElement2" className="font-semibold">Secondo Elemento</label>
                                    <div className="flex gap-2 ">
                                      <input type="number" className="w-15 text-center border rounded-sm" id="kitElement1-quantity" value={kit[1]?.quantity || 1} min={1} onChange={(e) => {
                                        const newKitElements = [...(kit || [])];
                                        newKitElements[1] = { ...kit[1], quantity: e.target.value };
                                        setKit(newKitElements);
                                      }} />  

                                      <input required  className="border rounded p-2 w-full" type="text" id="kitElement2-text" value={ kit[1]?.text || ""} placeholder="descrizione (Obbligatorio)" onChange={(e)=>{
                                        const newKitElements = [...(kit || [])]
                                        newKitElements[1] = ({...kit[1],text:e.target.value})
                                        setKit(newKitElements);
                                    }} />

                                        <input type="text" id="kitElement2-price" required  className="w-15 text-center border rounded-sm" placeholder="Prezzo"  value={kit[1]?.price || ""} onChange={(e)=>{
                                            const newKitElements = [...(kit || [])]
                                            newKitElements[1] = ({...kit[1],price:e.target.value})
                                            setKit(newKitElements);
                                        }}  />  
                                    </div>
                                  
                                </div>


                                
                                 <div className="flex flex-col">
                                    <label htmlFor="kitElement2" className="font-semibold">Terzo Elemento</label>
                                    <div className="flex gap-2 ">
                                      <input type="number" className="w-15 text-center border rounded-sm" id="kitElement2-quantity" value={kit[2]?.quantity || 0} min={0} onChange={(e) => {
                                        const newKitElements = [...(kit || [])];
                                        newKitElements[2] = { ...kit[2], quantity: e.target.value };
                                        setKit(newKitElements);
                                      }} />  

                                      <input required={!!kit[2]?.price}  className="border rounded p-2 w-full" type="text" id="kitElement2-text" value={ kit[2]?.text || ""} placeholder="descrizione (Obbligatorio)" onChange={(e)=>{
                                        const newKitElements = [...(kit || [])]
                                        newKitElements[2] = ({...kit[2],text:e.target.value})
                                        setKit(newKitElements);
                                    }} />

                                        <input required={!!kit[2]?.text} type="text" id="kitElement2-price"  className="w-15 text-center border rounded-sm" placeholder="Prezzo"  value={kit[2]?.price || ""} onChange={(e)=>{
                                            const newKitElements = [...(kit || [])]
                                            newKitElements[2] = ({...kit[2],price:e.target.value})
                                            setKit(newKitElements);
                                        }}  />  
                                    </div>
                                  
                                </div>


                                <div className="flex flex-col">
                                    <label htmlFor="kitElement3" className="font-semibold">Quarto Elemento</label>
                                    <div className="flex gap-2 ">
                                      <input type="number" className="w-15 text-center border rounded-sm" id="kitElement3-quantity" value={kit[3]?.quantity || 0} min={0} onChange={(e) => {
                                        const newKitElements = [...(kit || [])];
                                        newKitElements[3] = { ...kit[3], quantity: e.target.value };
                                        setKit(newKitElements);
                                      }} />  

                                      <input  required={!!kit[3]?.price}  className="border rounded p-2 w-full" type="text" id="kitElement3-text" value={ kit[3]?.text || ""} placeholder="descrizione (Obbligatorio)" onChange={(e)=>{
                                        const newKitElements = [...(kit || [])]
                                        newKitElements[3] = ({...kit[3],text:e.target.value})
                                        setKit(newKitElements);
                                    }} />

                                        <input required={!!kit[3]?.text} type="text" id="kitElement3-price"  className="w-15 text-center border rounded-sm" placeholder="Prezzo"  value={kit[3]?.price || ""} onChange={(e)=>{
                                            const newKitElements = [...(kit || [])]
                                            newKitElements[3] = ({...kit[3],price:e.target.value})
                                            setKit(newKitElements);
                                        }}  />  
                                    </div>
                                  
                                </div>

                                </div>
                                
        
                                <div className="mt-2">
                                    <button className="bg-black text-white w-[100px] p-3 rounded-lg cursor-pointer border font-bold transition hover:text-black hover:bg-transparent hover:border">Salva</button>
                                </div>
                            
                            </div>}
                        </div>
                </form>
             
                <ProductPreview product={product} imagePreviewUrl={imagePreviewUrl} isPreview={isPreview} setIsPreview={setIsPreview}/>
        </div>
    )
}