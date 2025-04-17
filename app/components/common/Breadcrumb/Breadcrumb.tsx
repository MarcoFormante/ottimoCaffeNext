import Link from 'next/link'
import React from 'react'
import BackBtn from './BackBtn'

interface BreadcrumbProps{
  category:string,
  name?:string
}

const Breadcrumb = ({category,name}:BreadcrumbProps) => {
  
  return (
    <div className='pt-[120px]'>
      <BackBtn/>
      <div className=" text-blue-text max-lg:hidden  min-lg:py-6">
        <Link href={"/"}>Home </Link> {">"}
        <Link className={!name ? "font-semibold capitalize" : ""} href={`/${category}`}> {category} </Link> {name ? ">" : ""}
      {  name && <span className="font-semibold"> {name}</span>  }
      </div>
    </div>
    
  )
}

export default Breadcrumb