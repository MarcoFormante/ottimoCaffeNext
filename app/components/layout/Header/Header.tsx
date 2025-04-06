import Link from 'next/link';
import logo from '@/public/assets/svg/logo_header.svg'
import search from '@/public/assets/svg/search.svg';
import cart from '@/public/assets/svg/cart.svg';
import Image from 'next/image';

export default function Header(){
  return (
    <header id='app-header' className='flex z-10 2xl:px-[200px] container'>
      <nav className='w-full mx-auto flex justify-between items-center '>
        {/* Logo */}
        <div className='logo' >
          <Link href='/'>
            <Image src={logo} alt='Ottimo Caffé' />
          </Link>
        </div>

         {/* Links */}
    <div className='flex items-center gap-10'>
        <div className='links flex'>
            <Link href='/promozioni'>Promozioni</Link>
            <Link href='/caffè-in-cialde'>Cialde</Link>
            <Link href='/caffè-in-capsule'>Capsule</Link>
            <Link href='/kit-per-il-caffè'>Macchinette e accessori</Link>
            <Link href='/kit-per-il-caffè'>Bottiglieria</Link>
            <Link href='/kit-per-il-caffè'>Kit</Link>
            <Link href='/kit-per-il-caffè'>Non solo caffè</Link>
        </div>
          
          {/* Icons */}
        <div className='icons-container flex cl-gap-12 '>
            <div className='cursor-pointer'>
              <Image className='aspect-square' width={21} height={21} src={search} alt='Cerca i prodotti' />
            </div>
            <div className='cursor-pointer'>
              <Image className='aspect-square' width={21} height={21} src={cart} alt='Consulta il carrello' />
            </div>
        </div>
    </div>
      </nav>
    </header>
  );
};
