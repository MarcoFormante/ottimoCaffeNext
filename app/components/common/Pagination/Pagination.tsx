'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface PaginationProps{
    pagination:number,
    totalProducts:number,
    productsLength:number
}

export default function Pagination({
    pagination,
    totalProducts,
    productsLength
}:PaginationProps
){
    const [page,setPage] = useState(1)
    const router = useRouter()
    const pathName = usePathname()
    const searchParams = useSearchParams()

    console.log(pagination,totalProducts,productsLength);
    
     useEffect(()=>{
        const params = new URLSearchParams(searchParams.toString())
        const p = params.get("page")
        setPage(Number(p))
     },[searchParams,router,pathName])


     function createQueryString(page:string){
        const params = new URLSearchParams(searchParams.toString())
        params.set("page",page)
        setPage(+page)
        return params.toString()
     }

     function handleOnClick(page:number){
        router.push(`${pathName}?`+ createQueryString(page.toString()))
     }

     console.log(totalProducts);
     
     
    return (
        <div hidden={!totalProducts} className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500">
                        <p>Pagina {page} di {pagination} /  <b>{totalProducts}</b> prodotti totali</p>
                    </div>
                    <div className="flex space-x-1">
                        <button 
                            onClick={()=>handleOnClick(page - 1)} 
                            disabled={page <= 1 || page <= 1 } 
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded  transition duration-200 ease ${page <= 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-50 hover:border-slate-400"}`}
                            >
                            Prev
                        </button>
                        {pagination >= 0 && Array.from({length:pagination + 1 }).map((_,i)=>{
                            const pageNumber = i 
                            return pageNumber !== 0 && (
                                <button 
                                key={pageNumber} 
                                onClick={()=>handleOnClick(pageNumber)} 
                                className={`cursor-pointer px-3 py-1 min-w-9 min-h-9 text-sm font-normal  ${page ===  pageNumber ? "bg-slate-800 border border-slate-800 text-white  " : "text-slate-500  border-slate-200  hover:border-slate-400 "}  border  rounded  transition duration-200 ease`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}
                    
                        <button 
                            onClick={()=>handleOnClick(page + 1)} 
                            disabled={page >= pagination}  
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded  transition duration-200 ease ${page >= pagination  ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-50 hover:border-slate-400"}`}
                            >
                            Next
                        </button>
                    </div>
            </div>
    )
}