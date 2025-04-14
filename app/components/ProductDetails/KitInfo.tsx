import React from 'react'

const KitInfo = () => {
  return (
    <section className='max-md:order-2 max-md:mt-8'>  
          <div className="flex flex-col gap-3">
            <h3 className="text-blue-text font-bold">La confezione contiene:</h3>  
            <ul className="flex flex-col gap-[17px]">
              <li className='flex justify-between items-center max-md:items-baseline'>
                <p className='min-[1047px]:min-w-[371px] max-[1048px]:pr-1.5 max-md:pr-2 relative text-blue-text'>1 x Macchinetta del caffè Frog per cialde morbide  <span className='absolute w-[2px] h-[23px] right-[0%] bg-gray-300 max-[1100px]:hidden '></span></p>  <span className='text-nowrap text-blue-primary font-bold '>49,99 <span className='text-[12px]'>EUR</span></span>  
              </li>  
              <li className='flex justify-between items-center max-md:items-baseline'>
                <p className='min-[1047px]:min-w-[371px] max-[1048px]:pr-1.5 max-md:pr-2 relative text-blue-text '>1 x Confezione da 30 cialde Ottimo caffè  <span className='absolute w-[2px] h-[23px] right-[0%] bg-gray-300 max-[1100px]:hidden '></span></p>  <span className='text-nowrap text-blue-primary font-bold'>9,99 <span className='text-[12px]'>EUR</span></span>  
              </li>  
            </ul>  
          </div>
    </section>
  )
}

export default KitInfo