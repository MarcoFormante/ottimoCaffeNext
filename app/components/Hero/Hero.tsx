import Image from "next/image";
import logo from '@/public/assets/svg/logo.svg'
import claim_ottimo from '@/public/assets/svg/Claim_Ottimo.svg'

export default function Hero(){
    return(
        <div id="hero" className="flex justify-center">
        <div id='hero__contents__container' className=''>
          <Image src={logo} className='drop-shadow-xl bg-cover' alt="Ottimo Caffé" />
          <Image className='m-auto' src={claim_ottimo} alt="logo Ottimo Caffé" />
        </div>
      </div>
    )
}