'use client'
import React, { useEffect, useState } from 'react'
import Links from './Links'
import Image from 'next/image'
import search from '@/public/assets/svg/search.svg';
import cart from '@/public/assets/svg/cart.svg';
import Logo from './Logo';
import SearchBar from './SearchBar';


const Nav = () => {

const [searchBarVisible,setSearchBarVisible] = useState(false)
const [menuActive,setMenuActive] = useState(false)
const [windowWidth,setWindowWidth] = useState(0)

function handleSearchBarVisibleState(state:boolean){
    setSearchBarVisible(state)
}

useEffect(()=>{
  window.addEventListener("resize",()=>{
    setWindowWidth(window.innerWidth)
    if (windowWidth > 1080 && menuActive) {
        setMenuActive(false)
    }
  })
  return () => window.removeEventListener("resize",()=>setWindowWidth(window.innerWidth))
},[menuActive, windowWidth])



useEffect(()=>{
  if (menuActive) {
    document.body.style.overflow = "hidden"
  }else{
    document.body.style.overflow = "auto"
  }
},[menuActive])


return (
    <nav className='w-full mx-auto flex justify-between items-center gap-0 '>
        <Logo menuActive={menuActive} setMenuActive={setMenuActive}/>
          <div className='flex items-center gap-3 '>
            <div className='flex items-center gap-10 '>
              { 
                  searchBarVisible && <SearchBar onClick={()=>handleSearchBarVisibleState(false)}/>
              }
              {/* Page Links */}
              <Links menuActive={menuActive} setMenuActive={setMenuActive}/>
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
          <div className='cursor-pointer min-[1081px]:hidden' onClick={()=>setMenuActive(!menuActive)}>
              <div className={`menu-b ${menuActive ? "menu-b-menu-on relative z-20" : ""}`}>
                <span className='bg-white-primary'></span>
                <span className='bg-white-primary'></span>
                <span className='bg-white-primary'></span>
              </div>
          </div>
        </div>
    </nav>
  )
}

export default Nav