
export function parseToFloatFixedTwo(value:string |number | "" | null){
    return (parseFloat(value as string)).toFixed(2)
}

export function parseFloatMultiply(value:string | number | "" | null,quantity:number){
     return (+parseFloat(value as string) * quantity).toFixed(2)
}


export function lengthBasedText(length:number,posText:string,negText:string){
   return  length > 1 || length < 1
        ? length + " " + posText 
        : negText;
}

export function isProduction() {
    return process.env.NODE_ENV === "production"
}