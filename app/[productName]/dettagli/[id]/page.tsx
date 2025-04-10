import Breadcrumb from "@/app/components/common/Breadcrumb/Breadcrumb";
import Footer from "@/app/components/ProductDetails/Footer";
import Header from "@/app/components/ProductDetails/Header";
import KitInfo from "@/app/components/ProductDetails/KitInfo";
import Image from "next/image";


export default function ProductDetails(){
  const isKit = true;
  return (
    <div className="px-[200px] max-2xl:px-[50px] max-lg:px-[16px] mb-[102px]">
      <Breadcrumb/>
      <article className={`flex justify-evenly gap-6 mt-[71px] max-lg:pr-[20px]`}> 
        <Image className="max-lg:w-[30vw] max-lg:h-[30vw]" src={"/assets/images/products/image-details.jpg"} width={508} height={470} alt="Ottimo Caffè - Kit macchinetta del caffè Frog + 1 confezione da 30 cialde"/>
        <div className={`flex flex-col justify-between  ${!isKit ? "justify-start gap-8" : ""}`}>
          <Header/>
          {isKit && <KitInfo/>}
          <Footer >
            <div className="flex flex-col max-lg:mt-[16px] ">
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

