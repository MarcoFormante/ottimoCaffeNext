import { SetStateAction } from "react";
import ProductCard, { ProductCardProps } from "../../common/ProductCard/ProductCard";
import { StaticImageData } from "next/image";

interface ProductPreviewProps{
    isPreview:boolean,
    setIsPreview:React.Dispatch<SetStateAction<boolean>>
    product:ProductCardProps,
    imagePreviewUrl:StaticImageData | string | null
}

export default function ProductPreview({isPreview,setIsPreview,product,imagePreviewUrl}:ProductPreviewProps){
    return (
        <div>
             <div onClick={() => setIsPreview(!isPreview)} className="fixed bottom-10 right-10">
                <button className="cursor-pointer border-black text-black border-1 bg-white relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-[40px] max-h-[40px] rounded-lg text-xs  hover:bg-black hover:text-white hover:border-amber-50">
                        <div className="w-4 ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                </button>
            </div>
            <div className="flex justify-center" hidden={!isPreview}>
                <ProductCard
                    id={""}
                    name={product?.name || ""}
                    description={product?.description || ""}
                    price={product?.price || ""}
                    image_url={imagePreviewUrl || ""}
                    category={product?.category || ""}
                    code={product?.code || ""}
                    slug={product?.slug || ""}
                    offer={product?.offer || ""}
                    active={product?.active || true}
                    hideDetails={true}
                />
            </div>
        </div>
    )
}