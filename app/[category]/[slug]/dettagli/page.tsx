import Breadcrumb from "@/app/components/common/Breadcrumb/Breadcrumb";
import Footer from "@/app/components/ProductDetails/Footer";
import Header from "@/app/components/ProductDetails/Header";
import KitInfo from "@/app/components/ProductDetails/KitInfo";
import { CATEGORIES } from "@/app/utils/helpers/constants";
import Image from "next/image";
import { notFound } from "next/navigation";


export default async function ProductDetails({params}:{
  params: Promise<{ slug: string }>
}){
  const {slug} = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/public/products/details?slug=${slug}`)
  const data = await res.json()
  

  if (!data.product || !data.success) {
    return notFound()
  }
   

  const categoryElement = CATEGORIES.find(c => c.href === `/${data.product.category}`)
  if (!categoryElement) {
      console.log("Category Error");
      notFound()
  }



  
  const isKit = false;
  return (
    <div className="px-[200px] max-2xl:px-[50px] max-lg:px-[16px] mb-[102px]  ">
    <Breadcrumb categoryName={(categoryElement?.nameInCategoryPage as string)}  categoryHref={data.product.category} productName={data.product.name}/>
      <article className={` flex justify-evenly gap-6  mt-[25px] max-md:flex-col max-md:mt-[21px]`}> 
         <Image className="max-lg:w-[40vw] max-lg:h-[40vw] max-h-[470px] w-[508px]  max-md:order-1   hidden min-md:block" src={`http://127.0.0.1:20162/storage/v1/object/public/products.images//${data.product.image_url}`} width={508} height={470} alt={data.product.name}/> 
        <div className={`p-6 min-md:w-[508px] max-md:w-[90vw] max-[600px]:p-0 max-[600px]:w-full max-md:m-auto flex flex-col justify-between  ${!isKit ? "justify-start gap-8" : ""}`}>
          <Header name={data.product.name} code={data.product.code}/>
          {isKit && <KitInfo/>}
          <div className="place-items-center order-1 mt-4">
            <Image className="min-md:hidden max-w-[508px] w-full" src={`http://127.0.0.1:20162/storage/v1/object/public/products.images//${data.product.image_url}`} width={508} height={470} alt={data.product.name}/>
          </div>
          <Footer isKit={isKit} product={data.product} price={+data.product.offer > 0 ? data.product.offer : data.product.price}/>
        </div>
      </article>  
    </div>
  )
}

