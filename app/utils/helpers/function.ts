export function parseToFloatFixedTwo(value:string |number | "" | null){
    return (parseFloat(value as string)).toFixed(2)
}