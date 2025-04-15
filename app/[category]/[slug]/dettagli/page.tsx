import Breadcrumb from "@/app/components/common/Breadcrumb/Breadcrumb";
import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard";
import Footer from "@/app/components/ProductDetails/Footer";
import Header from "@/app/components/ProductDetails/Header";
import KitInfo from "@/app/components/ProductDetails/KitInfo";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductDetails({params}:{
  params:{slug:string}
}){
  const {slug} =  await params
  const res = await fetch("http://localhost:3000/products.json")
  const data = await res.json()

  if (!data || data.length === 0) {
   return  notFound()
  }

  const product = data.filter((product:ProductCardProps )=> product.slug === slug)[0]
 
  if (!product) {
    return notFound()
  }
  
  const isKit = true;
  return (
    <div className="px-[200px] max-2xl:px-[50px] max-lg:px-[16px] mb-[102px] ">
    <Breadcrumb category={product.category} name={product.name}/>
      <article className={`flex justify-evenly gap-6  mt-[71px] max-md:flex-col`}> 
         <Image className="max-lg:w-[30vw] max-lg:h-[30vw] max-h-[470px]  max-md:order-1   hidden min-md:block" src={"/assets/images/products/image-details.jpg"} width={508} height={470} alt="Ottimo Caffè - Kit macchinetta del caffè Frog + 1 confezione da 30 cialde"/> 
        <div className={`flex flex-col justify-between  ${!isKit ? "justify-start gap-8" : ""}`}>
          <Header name={product.name} UUID={product.UUID}/>
          {isKit && <KitInfo/>}
          <div className="place-items-center order-1 mt-4">
            <Image className="min-md:hidden max-w-[508px] w-full" src={"/assets/images/products/image-details.jpg"} width={508} height={470} alt="Ottimo Caffè - Kit macchinetta del caffè Frog + 1 confezione da 30 cialde"/>
          </div>
          <Footer isKit={isKit}>
            <div className="flex flex-col max-lg:mt-[16px] mt-1.5 max-md:text-right">
              <span className="text-blue-text font-bold ">Totale</span>
              <span className="text-2xl font-bold text-blue-primary">58,90<span className="text-[12px]"> EUR</span></span>
              <span className="text-gray-500 text-[12px]">iva inclusa</span>
            </div>
          </Footer>
        </div>
      </article>  
    </div>
  )
}

