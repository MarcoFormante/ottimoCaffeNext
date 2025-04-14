
'use client'
import { useRouter } from "next/navigation"

export default function BackBtn(){
    const router = useRouter()
   
    function handleBack(){
        if(window.history.length > 2){
            router.back()
        }else{
            router.push("/")
        }
    }

    return (
        <div>
             <div className='min-lg:hidden'>
                <button onClick={handleBack} className="flex gap-2 items-center cursor-pointer">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.825 7.5L16 7.5L16 9.5L3.825 9.5L9.425 15.1L8 16.5L-6.99382e-07 8.5L8 0.500001L9.425 1.9L3.825 7.5Z" fill="#1D1B20"/>
                </svg>
                <span className="text-xl">Indietro</span>
                </button>
            </div>
        </div>
    )
}