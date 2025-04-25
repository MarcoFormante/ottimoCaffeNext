import Image, { StaticImageData } from "next/image"
import Link from "next/link"


export type ProductCardProps = {
    id:string
    name: string,
    description: string,
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

    
  return (
    <article id="art-1" className='product-card drop-shadow-lg  '>
        <div>
            <figure>
                <div className="mb-6 min-h-[187px]">
                    <Image className="aspect-square w-full h-auto max-w-[202px] max-h-[187]" width={202} height={187} src={(hideDetails ? image_url : "/assets/images/products/" + image_url)}  alt={name} />
                </div>
                <figcaption>
                    <h3 className="font-normal text-black">Ottimo Caffè - {name}</h3>
                    <p className="product-card__desc font-normal mt-3 text-base">{description}</p>
                    <p>
                        <span className={`mt-3 ${offer ? "product-card__price-del text-base line-through font-semibold": "product-card__price"}`}>{price}</span>
                        {offer ? <span className="product-card__price"> {offer}</span>:""} 
                        <span className="product-card__price">EUR</span>
                    </p>
                </figcaption>
                {hideDetails ?
                    <div className="mt-4 product-card__button font-semibold">Scopri i dettagli</div>
                    :
                    <Link className="mt-4 product-card__button font-semibold" href={`/${category}/${slug}/dettagli`}>Scopri i dettagli</Link>
                }
               
            </figure>
        </div>
    </article>
  )
}

