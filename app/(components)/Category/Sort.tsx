'use client'
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const Sort = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()


  function OnChange(value:string){
    const params = new URLSearchParams(searchParams.toString())
    params.set("ordina",value)
    router.push(pathName + "?" + params.toString())
  }
  
  return (
    <div className='flex  items-center relative'>
        <select id='sort' onChange={(e)=>OnChange(e.target.value)} defaultValue={"prezzo-decrescente"} className='font-bold focus:outline-0 z-10'>
            <option value="prezzo-decrescente">Prezzo decrescente</option>
            <option value="prezzo-crescente">Prezzo crescente</option>
            <option value="prezzo-decrescente">Prezzo decrescente</option>
            <option value="prezzo-decrescente">Prezzo decrescente</option>
         </select>
          <span className='absolute top-1 right-0.5 z-1'>
                <svg role="presentation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12.175L7 -3.93402e-07L9 -3.0598e-07L9 12.175L14.6 6.575L16 8L8 16L-3.49691e-07 8L1.4 6.575L7 12.175Z" fill="#292F6C"/>
                </svg>
            </span>
    </div>
  
  )
}

export default Sort