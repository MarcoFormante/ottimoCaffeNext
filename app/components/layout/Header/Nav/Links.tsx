'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { NAVLINKS } from '@/app/utils/helpers/constants'
interface LinksProps{
  menuActive:boolean,
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}




const Links = ({menuActive,setMenuActive}:LinksProps) => {
  const pathname = usePathname()
  return (
    <ul id='nav-links'  className={`links flex ${menuActive ? "menu-on" : "" }`}>
       <li >
          <Link id='home-link' className={pathname === "/" ? "active" : ""} onClick={()=>setMenuActive(false)} href={"/"}>{"Home"}</Link>
        </li>
      {NAVLINKS.map(link => 
        <li key={link.text}>
          <Link className={pathname === link.href ? "active" : ""} onClick={()=>setMenuActive(false)} href={link.href}>{link.text}</Link>
        </li>
    )}
    </ul>
  )
}

export default Links