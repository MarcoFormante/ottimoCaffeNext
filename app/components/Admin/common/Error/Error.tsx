interface ErrorProps{
    message:string,
    color?:"red" | "gray" | ""
}

export default function Error({message,color}:ErrorProps){

    return <p className={`text-2xl text-${color || "red"}-700 font-semibold text-center mt-20 uppercase`}>{message}</p>
}