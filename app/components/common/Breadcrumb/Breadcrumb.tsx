import Link from 'next/link'
import React from 'react'

interface BreadcrumbProps{
  category:string,
  name:string
}

const Breadcrumb = ({category,name}:BreadcrumbProps) => {
  
  return (
    <div className="pt-[120px] text-blue-text">
        <Link href={"/"}>Home {">"}</Link> 
        <Link href={`/${category}`}> {category} {">"}</Link> 
        <span className="font-semibold"> {name}</span>  
    </div>
  )
}

export default Breadcrumb