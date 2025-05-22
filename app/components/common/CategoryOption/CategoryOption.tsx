
'use client'

import { CATEGORIES } from "@/app/utils/helpers/constants"

interface CategoryOptionProps{
    setCategory:React.Dispatch<React.SetStateAction<string>>
    setSearch:React.Dispatch<React.SetStateAction<string>>
}


export default function CategoryOption({setCategory,setSearch}:CategoryOptionProps){

    const handleSetCategory = (value:string)=>{
        if(!value){
            return 
        }
        setCategory(value)
        setSearch("")
    }

    return (
        <div>
            <b className="block">Categoria</b>
                <select id="searchByOption" name="searchByOption" autoFocus onChange={(e)=>handleSetCategory(e.target.value)}>
                <option  value={""}>Scegli una categoria</option>
                    {CATEGORIES.map((c)=>{
                        const value = c.href.replace("/","")
                        return c.nameInNav !== "promozioni" && <option key={c.nameInNav} value={value}>{c.nameInNav}</option>
                    })}
                </select>
        </div>
    )
}