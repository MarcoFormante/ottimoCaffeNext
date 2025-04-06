import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/public/assets/svg/logo_header.svg'

const Logo = () => {
  return (
    <div className='logo' >
    <Link href='/'>
      <Image src={logo} alt='Ottimo Caffé' />
    </Link>
  </div>
  )
}

export default Logo