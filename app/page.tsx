import Image from "next/image";
import Hero from "./components/Hero/Hero";
import Section from "./components/layout/Section/Section";
import ProductCard from "./components/ProductCard/ProductCard";
import productTest from '@/app/components/ProductCard/productTest.png'
import productTest2 from '@/app/components/ProductCard/productTest2.png'
import productTest3 from '@/app/components/ProductCard/productTest3.png'
import tazza from "@/public/assets/images/tazza.jpg"
import Footer from "./components/layout/Footer/Footer";
import Link from "next/link";
// import { getProduts } from "./actions/products";
// import { isProduction } from "./helpers";


const products = [
  {
    name: 'Ottimo Caffè - Kit famiglia, 3 confezioni da 30 Cialde (90 cialde totali)',
    desc: 'Carta filtro da 44mm',
    price: '59.90',
    img: productTest,
    pathName: 'caffè-in-grani',
    UUID: 'BNHDYJDW',
    id: '1',
    offer: '49.90'
  },
  {
    name: 'Ottimo Caffè - Confezione singola da 30 cialde',
    desc: 'Carta filtro da 44mm',
    price: '19.90',
    img: productTest2,
    pathName: 'caffè-in-grani',
    UUID: 'BNHDYJDW',
    id: '2',
    offer: '14.90'
  },
  {
    name: 'Kit macchinetta Frog + 1 pacco Ottimo caffè da 30 cialde',
    desc: 'Carta filtro da 44mm',
    price: '119.90',
    img: productTest3,
    pathName: 'caffè-in-grani',
    UUID: 'BNHDYJDW',
    id: '3',
    offer: '99.90'
  }
]




export default async function Home() {
  
  // try {
  //   const res =  await getProduts()
  // } catch (error) {
  //   if (!isProduction()) {
  //       console.log(error);
  //   }
  // }



  return (
    <div id='homepage' className="">
    <Hero/>

    <div className="flex flex-col gap-10">
        <Section>
          <div className='flex justify-between mt-16'>
            <h2 className='font-semibold text-2xl cl-blue-text mb-8'>Prodotti in promozione</h2>
              <Link className='text-base font-semibold underline' href={'#art-1'}>
                <span className="text-black font-normal">vedi tutti</span>
                <svg className="inline ml-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1D1B20"/>
                </svg>
              </Link>  
            </div>
          {/* Products */}
          <div className='flex items-center gap-7 overflow-x-scroll lg:justify-start xl:justify-center'>
              {products.map((product)=>(
                <ProductCard 
                  key={product.id}
                  name={product.name}
                  desc={product.desc}
                  price={product.price}
                  img={product.img}
                  pathName={product.pathName}
                  UUID={product.UUID}
                  offer={product.offer}
                />
              ))}
            </div>
        </Section>


      <Section>
      <div className='flex justify-between mt-6'>
        <h2 className='font-semibold text-2xl cl-blue-text mb-8'>Esplora i prodotti per categoria</h2>
      </div>
        <div className="flex gap-6 flex-wrap justify-center">
          <ul className="text-black flex  gap-6 justify-center">
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
          </ul>
        
          <ul className="text-black flex  gap-6 justify-center ">
            <li className="max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
          </ul>

          <ul className="text-black flex  gap-6 justify-center ">
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
          </ul>

          <ul className="text-black flex  gap-6 justify-center ">
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
            <li className=" max-2xl:w-full max-w-[169px] text-center  aspect-video flex align-center justify-center 2xl:max-w-[242px] h-[112px]"><Link className="w-full h-full grid place-items-center drop-shadow-lg rounded-[8px] bg-[#FFFFFF]" href={"#"}>In Promozione</Link></li>
          </ul>
        </div>   
         
    </Section>


    <Section style="mt-6 mb-14">
        <article className="flex flex-row content-center justify-between 2xl:gap-x-25 lg:justify-evenly">
          <header className="flex flex-col content-between gap-6  cl-blue-text max-w-[500px]">
              <h1 className="font-bold text-2xl tracking-tight pr-2">Scopri il gusto autentico della Sicilia con Ottimo Caffè!</h1>
              <p>Le nostre cialde da caffè sono preparate con passione e cura, utilizzando solo le migliori miscele siciliane per regalarti un caffè dal sapore intenso e ricco. </p>
              <p>Ma non è solo la qualità del nostro caffè a fare la differenza: con un servizio clienti sempre attento e disponibile, siamo qui per offrirti un’esperienza che ti farà tornare ogni volta.</p>
          </header>
          <Image className="w-auto h-auto aspect-auto" src={tazza}   alt="Ottimo Caffè - Caffè siciliano"/>
        </article>
    </Section>
  </div>
   
    <Footer/>
  </div>
  );
}
