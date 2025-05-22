import Link from 'next/link'
import React from 'react'
import { CATEGORIES } from '@/app/utils/helpers/constants'

const CategoryCards = () => {
  return (
    <React.Fragment>
        <div className='flex justify-between mt-6'>
            <h2 className='font-semibold text-2xl cl-blue-text mb-8 max-lg:text-xl'>Esplora i prodotti per categoria</h2>
        </div>
        <div>
            <ul id="category-cards" className="text-black grid  gap-6 justify-center w-[100%] m-auto place-items-center max-md:grid-cols-2">
              {CATEGORIES.map((c)=>{
                 return (
                      <li 
                        key={c.nameInCard} 
                        className={`font-normal text-center aspect-video 
                          flex align-center justify-center 
                          2xl:max-w-[242px] h-[112px] 
                          min-w-[169px] max-sm:h-[80px] w-full`}
                      >
                        <Link 
                          className={`w-full h-full grid place-items-center 
                            drop-shadow-lg rounded-[8px] bg-[#FFFFFF] hover:bg-primary
                             hover:text-white-primary transition-colors`
                            } 
                          href={c.href}
                        >
                        {c.nameInCard}
                        </Link>
                      </li>
                    )
                  })}
            </ul>
        </div> 
    </React.Fragment>
  )
}

export default CategoryCards