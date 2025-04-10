import Link from 'next/link'
import React from 'react'

const Breadcrumb = () => {
  return (
    <div className="pt-[120px] text-blue-text">
        <Link href={"/"}>Home {">"}</Link> 
        <Link href={"/prodotti-in-promozione"}> Prodotti in promozione {">"}</Link> 
        <Link href={"/prodotti-in-promozione"}> Prodotti in promozione {">"}</Link> 
        <span className="font-semibold"> Kit macchinettà del caffè + cialde</span>  
    </div>
  )
}

export default Breadcrumb