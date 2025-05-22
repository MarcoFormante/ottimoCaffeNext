
import React from 'react'
import Link from 'next/link'
import Slider from './Slider'
import ProductCard from '../../common/ProductCard/ProductCard'
import { getHomeProducts } from '@/app/lib/public/actions'


export default async function  ProductCardsSlider(){

  const {products,error} = await getHomeProducts()

  if (error){
    return null  
  }
    
  return products.length && (
    <React.Fragment>
        <div className='flex justify-between mt-14 max-[394px]:mt-10 items-baseline'>
            <h2 className='font-semibold text-2xl cl-blue-text mb-8 max-lg:text-xl'>Prodotti in promozione</h2>
            <Link className='text-base font-semibold underline'  href={'/in-promozione'}>
                <span className="text-black font-normal">vedi tutti</span>
                <svg className="inline ml-1.5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z" fill="#1D1B20"/>
                </svg>
            </Link>  
        </div>
    {
      <Slider>
        <>
            { products.map((product)=>{
              return (
                <ProductCard
                    id={product.id}
                    key={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image_url={product.image_url}
                    category={product.category}
                    code={product.code}
                    slug={product.slug}
                    offer={product.offer}
                    active={product.active}
                />)
         }) }
        </>
      </Slider>
    }
    </React.Fragment>
  )
}
