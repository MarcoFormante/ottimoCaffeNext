import Image, { StaticImageData } from "next/image"
import Link from "next/link"


export type ProductCardProps = {
    id:string
    name: string,
    desc: string,
    price: string,
    img: StaticImageData | string,
    category: string,
    UUID: string,
    offer?:string | null,
}


export default function ProductCard({img,name,desc,price,category,UUID,offer = null}:ProductCardProps){

    
  return (
    <article id="art-1" className='product-card drop-shadow-lg'>
        <div>
            <figure>
                <div className="mb-6">
                    <Image className="aspect-square w-auto h-auto max-w-[202px] max-h-[187]" width={202} height={187} src={"/assets/images/products/" + img} alt={name} />
                </div>
                <figcaption>
                    <h3 className="font-normal text-black">Ottimo Caffè - {name}</h3>
                    <p className="product-card__desc font-normal mt-3 text-base">{desc}</p>
                    <p>
                        <span className={`mt-3 ${offer ? "product-card__price-del text-base line-through font-semibold": "product-card__price"}`}>{price}</span>
                        {offer ? <span className="product-card__price"> {offer}</span>:""} 
                        <span className="product-card__price">EUR</span>
                    </p>
                </figcaption>
                <Link className="mt-4 product-card__button font-semibold" href={`/${category}/dettagli/${UUID}`}>Scopri i dettagli</Link>
            </figure>
        </div>
    </article>
  )
}

