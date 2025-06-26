import { useEffect, useState } from "react"

export interface AlertProps{
    message:string,
    color:| "bg-red-500"| "bg-green-500" | "bg-blue-500",
    callback?:()=>void,
    time?:number
}

export default function useAlert(al:AlertProps | null = null){
    const [alert,setAlert] = useState<AlertProps | null>(al)

    useEffect(()=>{
        setAlert(alert)
        let timer = null
          timer = setTimeout(()=>{
            setAlert(null)
            if (alert?.callback) {
                alert.callback()
            }
        }, alert?.time || 5000)
        return ()=>clearTimeout(timer)
    },[alert])

    const AlertComponent = ({style}:{style?:string}) => {
       return alert?.message && ( 
       <div onClick={()=>setAlert(null)}>
            <div className={`fixed top-0 z-10 left-[50%] font-regular max-w-[1440px] translate-x-[-50%]   block w-full p-6 ${alert?.color} text-base leading-5 text-white opacity-100 ${style}`}>
            {alert?.message}
            </div>
        </div>
       )
    }
       
return {AlertComponent,setAlert}

}