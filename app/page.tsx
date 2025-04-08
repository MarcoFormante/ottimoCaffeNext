import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Section from "./components/layout/Section/Section";
import tazza from "@/public/assets/images/tazza.jpg"
import Link from "next/link";
import ProductCardsSlider from "./components/ProductCardsSlider/ProductCardsSlider";
// import { getProduts } from "./actions/products";
// import { isProduction } from "./helpers";






export default async function Home() {
  
  // try {
  //   const res =  await getProduts()
  // } catch (error) {
  //   if (!isProduction()) {
  //       console.log(error);
  //   }
  // }

  // xl:w-[73%] mx-auto max-xl:w-[90%] max-lg:w-[100%]

  return (
    <div id='homepage' className="">
      <Hero/>
    <div className="flex flex-col gap-10 px-[200px] max-2xl:px-[50px] max-lg:px-[16px] ">
        <Section>
          <div className='flex justify-between mt-16 max-[394px]:mt-10 items-baseline'>
            <h2 className='font-semibold text-2xl cl-blue-text mb-8 max-lg:text-xl'>Prodotti in promozione</h2>
              <Link className='text-base font-semibold underline' href={'#art-1'}>
                <span className="text-black font-normal">vedi tutti</span>
                <svg className="inline ml-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1D1B20"/>
                </svg>
              </Link>  
            </div>

          {/* Products slider */}

          <ProductCardsSlider/>
           
        </Section>


      <Section>
        <div className='flex justify-between mt-6'>
          <h2 className='font-semibold text-2xl cl-blue-text mb-8 max-lg:text-xl'>Esplora i prodotti per categoria</h2>
        </div>
        <div>
          <ul id="category-cards" className="text-black grid  gap-6 justify-center w-[100%] m-auto place-items-center max-md:grid-cols-2">
            <li className="font-normal  text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF] hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>In Promozione</Link></li>
            <li className="font-normal text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Caffè in cialde</Link></li>
            <li className="text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Caffè in capsule</Link></li>
            <li className="text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Macchinette ed accessori</Link></li>
            <li className="text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Bottiglieria</Link></li>
            <li className="text-center aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Kit</Link></li>
            <li className="text-center aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Non solo caffè</Link></li>
            <li className="text-center aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px] min-w-[169px] max-sm:h-[80px] w-full"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]  hover:bg-primary hover:text-white-primary transition-colors" href={"#"}>Tutti i prodotti</Link></li>
          </ul>
        </div>   
         
      </Section>

      <Section style="mt-6 mb-14">
          <article className="flex flex-row  justify-between  max-md:flex-col-reverse gap-4 ">
            <div className="flex flex-col gap-6 cl-blue-text w-[55%] max-md:w-full">
                <h2 className="font-bold text-2xl tracking-tight pr-2 max-lg:text-xl">Scopri il gusto autentico della Sicilia con Ottimo Caffè!</h2>
                <p className="font-normal">Le nostre cialde da caffè sono preparate con passione e cura, utilizzando solo le migliori miscele siciliane per regalarti un caffè dal sapore intenso e ricco. </p>
                <p className="font-normal">Ma non è solo la qualità del nostro caffè a fare la differenza: con un servizio clienti sempre attento e disponibile, siamo qui per offrirti un’esperienza che ti farà tornare ogni volta.</p>
            </div>
            <Image className="w-[508px]  min-md:h-[85%]" src={tazza}  alt="Ottimo Caffè - Caffè siciliano"/>
          </article>
      </Section>

    </div>
  </div>
  );
} 
