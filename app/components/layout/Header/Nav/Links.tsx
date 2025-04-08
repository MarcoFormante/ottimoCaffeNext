import Link from 'next/link'
import React from 'react'

interface LinksProps{
  menuActive:boolean,
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const navLinks = [
  {
    href:"/promozioni",
    text:"Promozioni"
  },
  {
    href:"/cialde",
    text:"Cialde"
  },
  {
    href:"/capsule",
    text:"Capsule"
  },
  {
    href:"/macchinette-e-accessori",
    text:"Macchinette e accessori"
  },
  {
    href:"/bottiglieria",
    text:"Bottiglieria"
  },
  {
    href:"/kit",
    text:"Kit"
  },
  {
    href:"/non-solo-caffè",
    text:"Non solo caffè"
  },
]


const Links = ({menuActive,setMenuActive}:LinksProps) => {
  return (
    <ul id='nav-links'  className={`links flex ${menuActive ? "menu-on" : "" }`}>
      {navLinks.map(link => 
        <li key={link.text}>
          <Link onClick={()=>setMenuActive(false)} href={link.href}>{link.text}</Link>
        </li>
    )}
    </ul>
  )
}

export default Links