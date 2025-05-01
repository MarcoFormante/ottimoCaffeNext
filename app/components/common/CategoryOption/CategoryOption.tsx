
'use client'

import { categories } from "@/app/utils"
import { useRouter, ReadonlyURLSearchParams } from "next/navigation"

interface CategoryOptionProps{
    pathName:string,
    params:ReadonlyURLSearchParams
}


export default function CategoryOption({pathName,params}:CategoryOptionProps){
 const router = useRouter()

 function fetchByCategory(category:string){
    const searchParams = new URLSearchParams(params.toString())
    searchParams.set("categoria",category)
    searchParams.set("page","1")
    searchParams.delete("search")
    router.push(`${pathName}?${searchParams}`)
 }


    return (
        <div>
            <b className="block">Categoria</b>
                <select id="searchByOption" name="searchByOption" autoFocus onChange={(e)=>fetchByCategory(e.target.value)}>
                <option  value={""}>Scegli una categoria</option>
                    {categories.map((c)=>{
                        const value = c.href.replace("/","")
                        return c.nameInNav !== "promozioni" && <option key={c.nameInNav} value={value}>{c.nameInNav}</option>
                    })}
                </select>
        </div>
    )
}