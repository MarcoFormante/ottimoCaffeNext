
type Kit = Array<{quantity:string,text:string,price:string}>

const KitInfo = ({kitElements = null}:{kitElements:Kit | null}) => {
  return (
    <section className='max-md:order-2 max-md:mt-8'>  
          <div className="flex flex-col gap-3">
            <h3 className="text-blue-text font-bold">La confezione contiene:</h3>  
            <ul className="flex flex-col gap-[17px]">
              {(kitElements && kitElements.length > 0) && kitElements.map((el)=>{
                return el.quantity !== "0" && (
                   <li key={el.text + el.price} className='flex justify-between items-center max-md:items-baseline'>
                    <p className='min-[1047px]:min-w-[371px] max-[1048px]:pr-1.5 max-md:pr-2 relative text-blue-text'>{el.quantity || 1} x {el.text} <span className='absolute w-[2px] h-[23px] right-[0%] bg-gray-300 max-[1100px]:hidden '></span></p>  <span className='text-nowrap text-blue-primary font-bold '>{el.price}<span className='text-[12px]'>EUR</span></span>  
                  </li>
                )
              })}
             
            </ul>  
          </div>
    </section>
  )
}

export default KitInfo