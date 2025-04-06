import Link from 'next/link'
import React from 'react'

const Links = () => {
  return (
    <div className='links flex '>
        <Link href='/promozioni'>Promozioni</Link>
        <Link href='/caffè-in-cialde'>Cialde</Link>
        <Link href='/caffè-in-capsule'>Capsule</Link>
        <Link href='/kit-per-il-caffè'>Macchinette e accessori</Link>
        <Link href='/kit-per-il-caffè'>Bottiglieria</Link>
        <Link href='/kit-per-il-caffè'>Kit</Link>
        <Link href='/kit-per-il-caffè'>Non solo caffè</Link>
    </div>
  )
}

export default Links