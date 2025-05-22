import Link from "next/link";
import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb";
import Section from "../components/layout/Section/Section";
import { parseToFloatFixedTwo } from "../utils/helpers/function";
import Image from "next/image";
import { ProductCardProps } from "../components/common/ProductCard/ProductCard";
import { searchProducts } from "../lib/public/actions";

export const revalidate = 0

export default async function Ricerca({searchParams}:{
    searchParams:Promise<{testo:string}>
}){

    const search = (await searchParams).testo
    
    if (!search) {
        return
    }

    const {products,error} = await searchProducts(search)


     function FindText(text:string){
                const regex = new RegExp(search,"gi")
                if (search && text.matchAll(regex)) {
                    const newText = text.replace(regex,`<mark>$&</mark>`)
                    return <span dangerouslySetInnerHTML={{ __html: newText }} />;
                }
            }

    
    return (
        <Section style="min-h-[70dvh] px-[200px] max-2xl:px-[50px] max-lg:px-[16px]">
             <Breadcrumb categoryName={"Ricerca"} />
            <h1 className='text-[clamp(24px,5vw,32px)] font-semibold text-blue-text mt-6'>Ricerca dei Prodotti</h1> 
            <span className="inline text-lg text-primary">{`" ${search} "`}</span>

            <div className='flex flex-wrap gap-[15px] gap-y-12 mb-[44px] m-auto items-center min-[1448px]:gap-5 mt-12  max-2xl:grid grid-cols-3  max-[1165]:grid-cols-2 place-items-center max-md:grid-cols-1 max-md:gap-6 '>
        {!error ?  products.map((product) => {
            const isOffer = product.offer && product.offer !== "0"
             return (
                 <article id="art-1" key={product.id + product.price } className='product-card drop-shadow-lg'>
                     <figure className="flex flex-col justify-between h-full">
                         <div className="flex flex-col gap-0">
                            <div className="mb-6 min-h-[187px]">
                         <Image className="aspect-square w-full h-auto max-w-[202px] max-h-[187]" width={202} height={187} src={`http://127.0.0.1:20162/storage/v1/object/public/products.images//${product.image_url}`}  alt={product.name} />
                        </div>
                        <figcaption>
                            <h3 className="font-normal text-black">Ottimo Caffè - {FindText(product.name)}</h3>
                            <p className="product-card__desc font-normal mt-3 text-base">{FindText(product.description as string)}</p>
                            <p>
                                <span className={`mt-3 ${isOffer  ? "product-card__price-del text-base line-through font-semibold": "product-card__price"}`}>{parseToFloatFixedTwo(product.price)}</span>
                                {isOffer ? <span className="product-card__price"> {product.offer && parseToFloatFixedTwo(product.offer)}</span>:""} 
                                <span className="product-card__price">EUR</span>
                            </p>
                        </figcaption>
                        </div>
                        <div>
                            <Link className="mt-4 product-card__button font-semibold" href={`/${product.category}/${product.slug}/dettagli`}>Scopri i dettagli</Link>
                        </div>
                     </figure>
                </article> 
             )
        })
    : (
        <div>
            <p className="text-xl">Nessun Prodotto Trovato</p>
        </div>
    )
    }
    </div>
        </Section>
    )
} 


