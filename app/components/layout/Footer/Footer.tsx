'use client'

import { usePathname } from 'next/navigation';

import Image from "next/image";
import logo from "@/public/assets/svg/logo.svg"
import SocialMediaIcons from "./SocialMediaIcons";
import Link from "next/link";


export default function Footer(){

    const pathname = usePathname()

    return pathname !== "/login" &&(
        <footer id="app-footer" className="bg-blue-text  container-full m-auto pt-10 pb-[72px] max-md:text-xl">
            <div className="container-full m-auto flex justify-between  text-white-primary px-[200px] max-2xl:px-[50px]  max-lg:px-[16px]  min-md:max-lg:gap-6 max-md:flex-col max-md:gap-10  ">
                
{/* PRIMA COLUMN */}
                    <div className="flex flex-col gap-[40px] ">
                        <div className="payment-methods">
                            <h3 className="text-white-primary font-bold text-[20px] mb-4">Metodi di pagamento accettati</h3>
                            <Image src={"/assets/svg/payment-methods.svg"}  alt="Metodi di pagamento - Ottimo Caffé" width={332} height={38}  className="min-md:w-[242px] min-md:h-[38px]  w-auto h-auto"/>
                        </div>
                            <Image src={logo} alt="Ottimo Caffé" className="" width={153} height={49}/>
                            <div className="footer-address">
                                <address className="text-white-primary not-italic inline text-wrap">
                                    D.P. Event - Via nazionale 83 <span className="block"> S.Margherita  marina ME - Cap 98135 </span>
                                </address>
                                <span className="max-xl:block"> P.iva 03410070837</span>
                            </div>
                        </div>

 {/* SECONDA COLUMN */}
                <div className="flex justify-evenly w-[40%] mx-auto max-md:w-full max-md:gap-6  max-md:justify-start ">

                    <ul className="flex flex-col gap-[24px] font-normal pr-6 footer-category-list">
                        <li>
                            <Link href={"/in-promozione"}>Promozioni</Link>
                        </li>
                        <li>
                            <Link href={"/caffe-in-cialde"}>Caffè in cialde</Link>
                        </li>
                        <li>
                            <Link href={"/caffe-in-capsule"}>Caffè in capsule</Link>
                        </li>
                        <li>
                            <Link href={"/macchinette-e-accessori"}>Macchinette e <br /> accessori</Link>
                        </li>
                        <li>
                            <Link href={"bottiglieria"}>Bottiglieria</Link>
                        </li>
                    </ul>
{/* TERZA COLUMN */}
              
                    <ul className="flex flex-col gap-[24px] footer-category-list">
                        <li>
                            <Link href={"kit"}>Kit</Link>
                        </li>
                        <li>
                            <Link href={"non-solo-caffe"}>Non solo caffè</Link>
                        </li>
                        <li>
                            <Link href={"/privacy-policy"}>Privacy policy</Link>
                        </li>
                        <li>
                            <Link href={"/cookie-policy"}>Cookie policy</Link>
                        </li>
                       
                    </ul>

                </div>
 {/* QUARTA COLUMN */}

                    <div className="flex flex-col gap-12 ">
                        <div>
                            <h4 className="text-white-primary font-bold text-[20px] mb-4"> Contatti</h4>
                            <Link href={"tel:+39 380 64 68 034"} className="text-white-primary" title="Numero di Telefono Ottimo Caffé" aria-label="Numero di Telefono Ottimo Caffè">Whatsapp: +39 123 45 67 890</Link>
                            <Link href={"mailto:ottimo.caffe.23@gmail.com"} className="text-white-primary block mt-1.5" title="Numero di Telefono Ottimo Caffé" aria-label="Numero di Telefono Ottimo Caffè">E-mail: <span className="underline">ottimo.caffe.23@gmail.com</span></Link>
                        </div>
                        <div>
                            <p className="text-white-primary font-bold text-[20px] mb-4">Seguici su</p>
                            <SocialMediaIcons/>
                        </div>
                     
                    </div>
            </div>
        </footer>
    )
}

 