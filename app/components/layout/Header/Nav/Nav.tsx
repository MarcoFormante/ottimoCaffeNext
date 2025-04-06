'use client'
import React, { useState } from 'react'
import Links from './Links'
import Image from 'next/image'
import search from '@/public/assets/svg/search.svg';
import cart from '@/public/assets/svg/cart.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';


const Nav = () => {

const [searchBarVisible,setSearchBarVisible] = useState(false)

function handleSearchBarVisibleState(state:boolean){
    setSearchBarVisible(state)
}

return (
    <nav className='w-full mx-auto flex justify-between items-center '>
        <Logo/>
        <div className='flex items-center gap-10 relative'>
        { 
            searchBarVisible && <SearchBar onClick={()=>handleSearchBarVisibleState(false)}/>
        }
        <Links/>
          {/* Icons */}
        <div className='icons-container flex cl-gap-12 '>
            <div className='cursor-pointer'>
              <Image className='aspect-square' onClick={()=>handleSearchBarVisibleState(true)} width={21} height={21} src={search} alt='Cerca i prodotti' />
            </div>
            <div className='cursor-pointer'>
              <Image className='aspect-square' width={21} height={21} src={cart} alt='Consulta il carrello' />
            </div>
        </div>
    </div>
    </nav>
  )
}

export default Nav