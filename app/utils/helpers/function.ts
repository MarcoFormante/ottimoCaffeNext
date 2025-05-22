import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard";


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





export function sortProducts(asc:string,products:ProductCardProps[]){
    if (!products.length) {
        return 
    }
     products.sort((a:ProductCardProps, b:ProductCardProps) =>{
        const aPrice = parseFloat(a.offer as string) || parseFloat(a.price as string)
        const bPrice = parseFloat(b.offer as string) || parseFloat(b.price as string)
        if(asc === "true"|| asc === undefined) {
            return aPrice - bPrice
        }else{
            return bPrice - aPrice
        }
    })
}


export function findText(text:string,search:string){
    const regex = new RegExp(search,"gi")
    if (search && text.matchAll(regex)) {
        const newText = text.replace(regex,`<mark>$&</mark>`)
        return newText
    }
}