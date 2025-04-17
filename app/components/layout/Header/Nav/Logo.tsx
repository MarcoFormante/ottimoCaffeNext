'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/svg/logo_header.svg'


interface LinksProps{
  menuActive:boolean,
  setMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Logo = ({menuActive,setMenuActive}:LinksProps) => {
    
  return (
    <div className={`logo ${menuActive ? "z-30": ""}`} >
    <Link onClick={()=>setMenuActive(false)} href='/'>
      <Image src={logo} alt='Ottimo Caffé' />
    </Link>
  </div>
  )
}

export default Logo