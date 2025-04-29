interface AlertProps{
    alert:{
        type: | "info" | "error" | "success",
        message:string,
        color?:| "red"| "green" | "blue"
    }
    
}

export default function Alert({alert}:AlertProps){
    return (
         <div className="flex w-full flex-col gap-2">
            <div className="font-regular relative block w-full  bg-red-500 p-4 text-base leading-5 text-white opacity-100">
            {alert.message}
            </div>
        </div>
    )
}