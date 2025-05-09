import Link from 'next/link'
import React from 'react'
import BackBtn from './BackBtn'

interface BreadcrumbProps{
  categoryName:string,
  productName?:string,
  categoryHref?:string
}

const Breadcrumb = ({categoryName,productName,categoryHref}:BreadcrumbProps) => {
  
  return (
    <div className='pt-[120px]'>
      <BackBtn/>
      <div className=" text-blue-text max-lg:hidden  min-lg:py-6">
        <Link href={"/"}>Home</Link> {">"}
        {!productName && <span className='font-semibold '> {categoryName}</span>}
        {productName && <>
        <Link className={!productName ? "font-semibold capitalize" : ""}  href={`/${categoryHref}`}> {categoryName} </Link> {productName ? ">" : ""}
        </> 
        } 
      {  productName && <span className="font-semibold"> {productName}</span>  }
      </div>
    </div>
    
  )
}

export default Breadcrumb