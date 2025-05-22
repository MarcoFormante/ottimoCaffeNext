import { notFound } from 'next/navigation'
import ProductCard, { ProductCardProps } from '../components/common/ProductCard/ProductCard'
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import Sort from '../components/Category/Sort'
import { CATEGORIES } from '../utils/helpers/constants'
import { sortProducts } from './utils'


export default async function Category({params,searchParams}:{
    params: Promise<{ category: string }>
    searchParams: Promise<{ asc: string }>
}){
    const {category} = await params
    const {asc} = await searchParams
        
     const categoryElement = CATEGORIES.find(c => c.href === `/${category}`)
     
    if (!categoryElement) {
        console.log("error category");
        return  notFound()
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}api/public/products?category=${category}&order=false`)
    const data = await response.json()
    const products = data.products
    sortProducts(asc,products)
   

  return (
    <div> 
        <div className='min-h-[70dvh] px-[200px] max-2xl:px-[50px] max-lg:px-[16px]'>
            <Breadcrumb categoryName={categoryElement.nameInCategoryPage} />
            <h1 className='text-[clamp(24px,5vw,32px)] font-semibold text-blue-text mt-6'>
                <span>{categoryElement.nameInCategoryPage}</span>
            </h1>
            <div className='flex items-center justify-between mt-6 mb-6'>
                {(products.length > 1 || !products.length ) && <p className=' text-blue-text'>{products.length} prodotti trovati</p>}
                {products.length === 1  && <p className='mt-6 text-blue-text'> 1 prodotto trovato</p>}
                {products.length > 1 &&  
                <div className='flex text-blue-text'>
                   <p className='max-sm:hidden'>Ordina per:</p> 
                   <Sort /> 
                </div> }
            </div>
          
            <div className='flex flex-wrap gap-[15px] gap-y-12 mb-[44px] m-auto items-center min-[1448px]:gap-5 mt-12  max-2xl:grid grid-cols-3  max-[1165]:grid-cols-2 place-items-center max-md:grid-cols-1 max-md:gap-6 '>
                { products?.map((product:ProductCardProps,i:number)=>  
                    <ProductCard
                        id={product.id}
                        key={product.code + i }
                        name={product.name}
                        description={product.description}
                        price={product.price}
                        image_url={product.image_url}
                        category={product.category}
                        code={product.code}
                        slug={product.slug}
                        offer={product.offer}
                        active={product.active}
                    />
                )}
            </div>
        </div>
    </div>
  )
}



