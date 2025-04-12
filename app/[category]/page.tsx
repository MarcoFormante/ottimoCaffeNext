import { notFound } from 'next/navigation'
import ProductCard, { ProductCardProps } from '../components/common/ProductCard/ProductCard'
import Breadcrumb from '../components/common/Breadcrumb/Breadcrumb'
import Sort from '../components/Category/Sort'

const categories = ["promozioni","cialde","capsule","macchinette-e-accessori","bottiglieria","kit","non-solo-caffe"]

export const revalidate = 10

export  async function page({params}:{
    params:{category:string}
}){
    const { category } = await params
    
    if (!categories.includes(category.toLowerCase())) {
        console.log("error category");
        return  notFound()
    }
    const data = await fetch("http://localhost:3000/products.json")
    .then(res => res.json())
    .catch(error => console.log(error))
    
    if (!data || data.length === 0) {
        console.log("no data");
        return  notFound()
    }

    const products =  data.filter((p:ProductCardProps) => p.category === category)


  return (
    <div> 
        <div className='min-h-[70dvh] px-[200px] max-2xl:px-[50px] max-lg:px-[16px]'>
            <Breadcrumb category={category}/>
            <h1 className='text-[clamp(24px,5vw,32px)] font-semibold text-blue-text mt-6'><CategoryText category={category}/></h1>
            <div className='flex items-center justify-between mt-6 mb-6'>
                {(products.length > 1 || !products.length ) && <p className=' text-blue-text'>{products.length} prodotti trovati</p>}
                {products.length === 1  && <p className='mt-6 text-blue-text'> 1 prodotto trovati</p>}
               {products.length > 1 &&  <div className='flex text-blue-text'>
                   <p>Ordina per:</p> 
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

export default page

const CategoryText = ({category}:{category: typeof categories[number]})=> {

    return categories.includes("macchinette") ? 
    <span>Macchinette e Accessori</span> :
    categories.includes("promozioni") ? 
    <span>Prodotti in Promozione</span> :
    categories.includes("non-solo-caffe") ? 
    <span>Non solo Caffè</span>: 
    <span className='capitalize'>{category}</span>
}
