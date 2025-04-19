import { notFound } from 'next/navigation'
import ProductCard, { ProductCardProps } from '../(components)/common/ProductCard/ProductCard'
import Breadcrumb from '../(components)/common/Breadcrumb/Breadcrumb'
import Sort from '../(components)/Category/Sort'
import { categories } from '../utils'
import productsList from "./products.json"
export const revalidate = 10


export default async function Category({params,searchParams}:{
    params: Promise<{ category: string }>
    searchParams: Promise<{ ordina: string }>
}){
    const { category } = await params
    const {ordina} = await searchParams
        
        
     const categoryElement = categories.find(c => c.href === `/${category}`)
    
     
    if (!categoryElement) {
        console.log("error category");
        return  notFound()
    }


    // const data = await fetch("products.json")
    // .then(res => res.json())
    // .catch(error => console.log(error))
    
    // if (!data || data.length === 0) {
    //     console.log("no data");
    //     return  notFound()
    // }

    const products = JSON.parse(JSON.stringify(productsList)).filter((p:ProductCardProps) => p.category === category)

    if (ordina === "prezzo-crescente") {
        products.sort((a:ProductCardProps, b:ProductCardProps) => +a.price - +b.price)
    }


  return (
    <div> 
        <div className='min-h-[70dvh] px-[200px] max-2xl:px-[50px] max-lg:px-[16px]'>
            <Breadcrumb categoryName={categoryElement.nameInCategoryPage} />
            <h1 className='text-[clamp(24px,5vw,32px)] font-semibold text-blue-text mt-6'>
                <span>{categoryElement.nameInCategoryPage}</span>
            </h1>
            <div className='flex items-center justify-between mt-6 mb-6'>
                {(products.length > 1 || !products.length ) && <p className=' text-blue-text'>{products.length} prodotti trovati</p>}
                {products.length === 1  && <p className='mt-6 text-blue-text'> 1 prodotto trovati</p>}
                {products.length > 1 &&  
                <div className='flex text-blue-text'>
                   <p className='max-sm:hidden'>Ordina per:</p> 
                   <Sort /> 
                </div> }
            </div>
          
            <div className='flex flex-wrap gap-[15px] gap-y-12 mb-[44px] m-auto items-center min-[1448px]:gap-5 mt-12  max-2xl:grid grid-cols-3  max-[1165]:grid-cols-2 place-items-center max-md:grid-cols-1 max-md:gap-6 '>
                {products.map((product:ProductCardProps,i:number)=>  
                    <ProductCard
                        id={product.id}
                        key={product.UUID + i }
                        name={product.name}
                        desc={product.desc}
                        price={product.price}
                        img={product.img}
                        category={product.category}
                        UUID={product.UUID}
                        slug={product.slug}
                        offer={product.offer}
                    />
                )}
            </div>
        </div>
    </div>
  )
}



