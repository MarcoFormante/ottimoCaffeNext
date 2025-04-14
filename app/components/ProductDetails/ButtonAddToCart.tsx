import React, { useContext, useEffect, useState} from 'react'
import Button from '../common/Button/Button'
import { Context } from '@/app/context/CartContext'
import Toast from './Toast'


const ButtonAddToCart = ({quantity}:{quantity:number}) => {
  const cartContext = useContext(Context)
  const [toasts,setToasts] = useState<number[]>([])



  function addToCart()
    {
      const products = [...cartContext.products]
      const index = products.findIndex((product)=> product.UUID === "esa3")
      if (index !== -1) {
          products[index].quantity += quantity
          cartContext.setProducts(products)
      }else{
        cartContext.setProducts((prev)=>[...prev,{
          id:"string",
          name: "string",
          desc: "string",
          price: "string",
          img: "StaticImageData",
          category: "string",
          UUID: "esa3",
          slug:"slug",
          offer:"string",
          quantity
        }])
      }
      setToasts((prev)=>[...prev,quantity])
  }

  
  useEffect(()=>{
    if (toasts.length) {
      const timer = setTimeout(()=>{
        const newToasts = toasts.filter((t,i) => i === 1)
        setToasts([...newToasts])
       },3500)
       return ()=> clearTimeout(timer)
    }
  },[toasts])



  return (
    <div className='max-md:place-items-center '>
    { toasts.length > 0 && toasts.map((quantity,i)=><Toast key={i} quantity={quantity}/>)} 
    <Toast quantity={1}/>
      <Button onClick={addToCart} style="mt-10">
          <div className="flex gap-x-2.5 items-center">
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.800048 0.000191713C0.358272 0.000191713 0 0.360629 0 0.805107C0 1.24959 0.358072 1.61002 0.800048 1.61002H3.45834C4.78238 4.90936 6.08648 8.21473 7.39991 11.52L6.19158 14.4459C6.09039 14.69 6.11885 14.9839 6.26487 15.2037C6.41107 15.4234 6.67037 15.562 6.9332 15.5609H20.2665C20.6892 15.5669 21.0779 15.1814 21.0779 14.756C21.0779 14.3308 20.6892 13.9451 20.2665 13.9511H8.1332L8.82477 12.2909L21.6667 11.2598C22.0028 11.2332 22.3071 10.9697 22.3834 10.6394L23.9835 3.66392C24.0882 3.194 23.6788 2.68141 23.2002 2.68289H5.60829L4.74167 0.503042C4.623 0.207915 4.31645 0 4.00006 0L0.800048 0.000191713ZM6.25005 4.29291H22.1915L20.9499 9.709L8.79177 10.6816L6.25005 4.29291ZM9.60015 16.6342C8.13682 16.6342 6.93348 17.8449 6.93348 19.3171C6.93348 20.7893 8.13682 22 9.60015 22C11.0635 22 12.2668 20.7893 12.2668 19.3171C12.2668 17.8449 11.0635 16.6342 9.60015 16.6342ZM17.6002 16.6342C16.1368 16.6342 14.9335 17.8449 14.9335 19.3171C14.9335 20.7893 16.1368 22 17.6002 22C19.0635 22 20.2668 20.7893 20.2668 19.3171C20.2668 17.8449 19.0635 16.6342 17.6002 16.6342ZM9.60015 18.244C10.1987 18.244 10.6667 18.7149 10.6667 19.3171C10.6667 19.9193 10.1987 20.3902 9.60015 20.3902C9.00158 20.3902 8.53358 19.9191 8.53358 19.3171C8.53358 18.7149 9.00177 18.244 9.60015 18.244ZM17.6002 18.244C18.1987 18.244 18.6667 18.7151 18.6667 19.3171C18.6667 19.9193 18.1985 20.3902 17.6002 20.3902C17.0016 20.3902 16.5336 19.9193 16.5336 19.3171C16.5336 18.7149 17.0016 18.244 17.6002 18.244Z" fill="#FAFAFA"/>
          </svg>
            Aggiungi al carrello
          </div>
    </Button>
  </div>
  )
}

export default ButtonAddToCart