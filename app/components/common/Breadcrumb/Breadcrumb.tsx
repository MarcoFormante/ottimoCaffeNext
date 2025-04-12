import Link from 'next/link'
import React from 'react'

interface BreadcrumbProps{
  category:string,
  name?:string
}

const Breadcrumb = ({category,name}:BreadcrumbProps) => {
  
  return (
    <div className="pt-[120px] text-blue-text ">
        <Link href={"/"}>Home {">"}</Link> 
        <Link className={!name ? "font-semibold capitalize" : ""} href={`/${category}`}> {category} {name ? ">" : ""}</Link> 
      {  name && <span className="font-semibold"> {name}</span>  }
    </div>
  )
}

export default Breadcrumb