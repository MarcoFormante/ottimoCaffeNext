import { ProductCardProps } from "../components/common/ProductCard/ProductCard"


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