import Image from "next/image";
import logo from "@/public/assets/svg/logo.svg"
import paymentMethod from "./paymentTypes.png"
import SocialMediaIcons from "./SocialMediaIcons";
import Link from "next/link";


export default function Footer(){
    return (
        <footer id="app-footer" className="bg-blue-text  container-full m-auto pt-10 pb-[72px]">
            <div className="container-full m-auto flex  justify-between  cl-pd-200x">
{/* PRIMA COLUMN */}
                    <div className="flex flex-col gap-[40px]">
                        <div className="payment-methods">
                            <h3 className="text-white-primary font-bold text-[20px] mb-4">Metodi di pagamento accettati</h3>
                            <Image src={paymentMethod} alt="Metodi di pagamento - Ottimo Caffé" width={242} height={27.7}/>
                        </div>
                            <Image src={logo} alt="Ottimo Caffé" className="" width={153} height={49}/>
                            <div className="footer-address">
                                <address className="text-white-primary not-italic inline">
                                    D.P. Event - Via nazionale 83 S.Margherita <br/> marina ME - Cap 98135 
                                </address>
                                <span> - P.iva 03410070837</span>
                            </div>
                        </div>

 {/* SECONDA COLUMN */}

                    <ul className="flex flex-col gap-[24px] font-normal">
                        <li>
                            <Link href={"#"}>Promozioni</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Caffè in cialde</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Caffè in capsule</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Macchinette e <br /> accessori</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Bottiglieria</Link>
                        </li>
                    </ul>


                    <ul className="flex flex-col gap-[24px]">
                        <li>
                            <Link href={"#"}>Kit</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Non solo caffè</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Privacy policy</Link>
                        </li>
                        <li>
                            <Link href={"#"}>Cookie policy</Link>
                        </li>
                       
                    </ul>



 {/* TERZA COLUMN */}

                    <div className="flex flex-col gap-12 ">
                        <div>
                            <h4 className="text-white-primary font-bold text-[20px] mb-4"> Contatti</h4>
                            <Link href={"tel:+"} className="text-white-primary" title="Numero di Telefono Ottimo Caffé" aria-label="Numero di Telefono Ottimo Caffè">Whatsapp: +39 123 45 67 890</Link>
                            <Link href={"mailto:formante.marco@gmail.com"} className="text-white-primary block mt-1.5" title="Numero di Telefono Ottimo Caffé" aria-label="Numero di Telefono Ottimo Caffè">E-mail: <span className="underline">ottimo.caffe.23@gmail.com</span></Link>
                        </div>
                        <div>
                            <p className="text-white-primary font-bold text-[20px] mb-4"> Seguici su</p>
                            <SocialMediaIcons/>
                        </div>
                     
                    </div>
            </div>
        </footer>
    )
}

 