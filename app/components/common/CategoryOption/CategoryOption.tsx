
'use client'

import { categories } from "@/app/(main)/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function CategoryOption(){
 const [category,setCategory] = useState("tutti-i-prodotti")
 const router = useRouter()
 const pathName = usePathname()
 const searchParams = useSearchParams()


 useEffect(()=>{
        const params = new URLSearchParams(searchParams.toString())
        params.set("categoria",category)
        params.set("page","1")
        router.push(`${pathName}?${params}`)
 },[category])

    return (
        <div>
            <b className="block">Categoria</b>
                <select id="searchByOption" name="searchByOption" defaultValue={"tutti-i-prodotti"} autoFocus onChange={(e)=>setCategory(e.target.value)}>
                    {categories.map((c)=>{
                        const value = c.href.replace("/","")
                        return <option key={c.nameInNav} value={value}>{c.nameInNav}</option>
                    })}
                    <option value={"category"}>Category</option>
                </select>
        </div>
    )
}