import { parseToFloatFixedTwo } from "@/app/utils/helpers/function"
import Image, { StaticImageData } from "next/image"
import Link from "next/link"


export type ProductCardProps = {
    id:string
    name: string,
    description?: string,
    price: string,
    image_url: StaticImageData | string,
    category: string,
    code: string,
    slug:string
    offer?:string | null,
    active:boolean,
    stripe_price_id?: string,
    stripe_product_id?: string,
    hideDetails?:boolean
}



export default function ProductCard({image_url,name,description,price,category,slug,offer = null,hideDetails = false}:ProductCardProps){

    const isOffer = offer && offer !== "0"
    
  return (
    <article id="art-1" className='product-card drop-shadow-lg'>
        <div className="h-full">
            <figure className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-0">
                    <div className="mb-6 min-h-[187px]">
                 { image_url && <Image className="aspect-square w-full h-auto max-w-[202px] max-h-[187]" width={202} height={187} src={(hideDetails ? image_url : `http://127.0.0.1:20162/storage/v1/object/public/products.images//${image_url}` )}  alt={name} />}
                </div>
                <figcaption>
                    <h3 className="font-normal text-black">Ottimo Caffè - {name}</h3>
                    <p className="product-card__desc font-normal mt-3 text-base">{description}</p>
                    <p>
                        <span className={`mt-3 ${isOffer  ? "product-card__price-del text-base line-through font-semibold": "product-card__price"}`}>{parseToFloatFixedTwo(price)}</span>
                        {isOffer ? <span className="product-card__price"> {parseToFloatFixedTwo(offer)}</span>:""} 
                        <span className="product-card__price">EUR</span>
                    </p>
                </figcaption>
                </div>
                <div>
                    
                    {hideDetails ?
                        <div className="mt-4 product-card__button font-semibold">Scopri i dettagli</div>
                        :
                        <Link className="mt-4 product-card__button font-semibold" href={`/${category}/${slug}/dettagli`}>Scopri i dettagli</Link>
                    }
                </div>
                
            </figure>
        </div>
    </article>
  )
}

