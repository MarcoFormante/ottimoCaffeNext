"use client"
import React, {  useState } from 'react'
import { createContext } from 'react'
import { ProductCardProps } from '../components/common/ProductCard/ProductCard';

type ProductPropsWithQuantity = ProductCardProps & {quantity:number};

type ProductsContext = {
  products:  ProductPropsWithQuantity[],
  setProducts:React.Dispatch<React.SetStateAction<ProductPropsWithQuantity[]>>,
}

export const Context = createContext({} as ProductsContext) 

export function CartContext({children}:{children:React.ReactElement}){
    const [products,setProducts] = useState<ProductPropsWithQuantity[]>([])
    
  return (
    <Context.Provider value={{products,setProducts}}>
        {children}
    </Context.Provider>
  )
}

export default CartContext