/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Pagination from "@/app/components/common/Pagination/Pagination"
import CategoryOption from "../../components/common/CategoryOption/CategoryOption"
import {Suspense, useEffect, useState} from "react"
import { usePathname, useSearchParams } from "next/navigation"
import ProductsList from '../../components/Admin/ProductsList/ProductsList';
import { useRouter } from "next/navigation"


export default function Products(){
    const [products,setProducts] = useState([])
    const [totalProducts,setTotalProducts] = useState(0)
    const [isPending,setIsPending] = useState(true)
    const [search,setSearch] = useState("")
    const [error,setError] = useState<{message:string,color:"red"|"gray"| ""}>({message:"",color:""})
    const params = useSearchParams()
    const [searchActive,setSearchActive]= useState(false)
    const pathName = usePathname()
    const router = useRouter()

    
   
    useEffect(() => {
       async function fetchProducts(){
        setIsPending(true)
        let isSearching = true

        if (!params.get("search") || params.get("search") !== search) {
            setSearchActive(false)
            isSearching = false
        }
        try {
            const res = await fetch("/api/admin/products",{
                method:"POST",
                body:JSON.stringify({
                    page:params.get("page") || "1",
                    categoria:params.get("categoria") || "tutti-i-prodotti",
                    search:isSearching ? search : null
                })
            })
            if(!res.ok) throw new Error("Errore nel recupero dei prodotti")
            const data = await res.json()
            if (data.products) {
                setProducts(data.products)
                setTotalProducts(data?.totalProducts || 0)
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError({
                message: error instanceof Error ? error.message : "Errore sconosciuto",
                color: "red"
            });
        }finally{
            setIsPending(false)
        }
    }
    fetchProducts()
      }, [params.toString()]);

   

    
return (
    <div>
        <div className="mx-auto">
            <div className="w-full p-10">
                <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                    <div className=" pt-5 ml-5 mb-5">
                        <Suspense fallback={"loading"}>
                            <CategoryOption pathName={pathName} params={params}/>
                        </Suspense>
                    </div>
                    <div className="ml-3">
                        <div className="w-full max-w-sm min-w-[200px] relative">
                            <div className="relative">
                                <input
                                    className="w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Carca prodotto..."
                                    value={search}
                                    onChange={(e)=>setSearch(e.currentTarget.value)}
                                />
                                <button
                                    className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded cursor-pointer"
                                    type="button"
                                    onClick={()=>{
                                        const searcParams = new URLSearchParams(params.toString())
                                        searcParams.delete("categoria")
                                        searcParams.set("search",search)
                                        setSearchActive(true)
                                        router.push(`${pathName}?${searcParams}`)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
              
                <ProductsList 
                    products={products} 
                    isPending={isPending} 
                    error={error} 
                    searchActive={searchActive} 
                    search={search}
                    setTotalProducts={()=>setTotalProducts(prev => prev - 1 )}
                />
         
                <Suspense fallback={"loading"}>
                    <Pagination 
                        pagination={Math.round(totalProducts / 10)} 
                        totalProducts={totalProducts}
                        productsLength={products.length}
                    />
                </Suspense>
            </div>
        </div>
    </div>
    )
}