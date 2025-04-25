'use client'

import Nav from './Nav/Nav';
import { usePathname } from 'next/navigation';

export default function Header(){
  const pathname = usePathname()

  return  !pathname.startsWith("/login") && !pathname.startsWith("/admin") && (
    <header id='app-header' className='flex px-[200px] max-2xl:px-[50px] max-lg:px-[16px] container relative'>
      <Nav/>
    </header>
  );
};
