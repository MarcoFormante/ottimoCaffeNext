"use client"

import React, { useEffect, useRef, useState } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import productTest from '@/app/components/ProductCard/productTest.png'
import productTest2 from '@/app/components/ProductCard/productTest2.png'
import productTest3 from '@/app/components/ProductCard/productTest3.png'

const products = [
    {
      name: 'Ottimo Caffè - Kit famiglia, 3 confezioni da 30 Cialde (90 cialde totali)',
      desc: 'Carta filtro da 44mm',
      price: '59.90',
      img: productTest,
      pathName: 'caffè-in-grani',
      UUID: 'BNHDYJDW',
      id: '1',
      offer: '49.90'
    },
    {
      name: 'Ottimo Caffè - Confezione singola da 30 cialde',
      desc: 'Carta filtro da 44mm',
      price: '19.90',
      img: productTest2,
      pathName: 'caffè-in-grani',
      UUID: 'BNHDYJDW',
      id: '2',
      offer: '14.90'
    },
    {
      name: 'Kit macchinetta Frog + 1 pacco Ottimo caffè da 30 cialde',
      desc: 'Carta filtro da 44mm',
      price: '119.90',
      img: productTest3,
      pathName: 'caffè-in-grani',
      UUID: 'BNHDYJDW',
      id: '3',
      offer: '99.90'
    }
  ]





const ProductCardsSlider = () => {
const [sliderScrollX,setSliderScrollX] = useState(0)
const sliderRef = useRef<HTMLDivElement | null>(null)
const [activeCardByScroll,setActiveCardByScroll] = useState(0)
const sliderScrollWidth = useRef<number>(0)
const [isScrollingByClick,setIsScrollingByClick] = useState(false)



useEffect(()=>{
    const slider = sliderRef.current
    if (slider ) {
        sliderScrollWidth.current = slider.scrollWidth;

        const handleScroll = () => {
            if (isScrollingByClick) {
                return
            }
            setIsScrollingByClick(false)
            const scrollLeft = slider.scrollLeft;
            const visibleWidth = slider.clientWidth; 
            const totalScrollableWidth = sliderScrollWidth.current - visibleWidth;
            const scrollPercentage = (scrollLeft / totalScrollableWidth) * 100;
            setSliderScrollX(scrollPercentage); 
        };

        slider.addEventListener("scroll", handleScroll);

        return () => slider.removeEventListener("scroll", handleScroll);
    }
},[sliderRef,isScrollingByClick])


useEffect(()=>{
    const scrollWidth = sliderScrollWidth.current
    if (scrollWidth) {
        if (sliderScrollX < 33.33) {
            setActiveCardByScroll(0);
        } else if (sliderScrollX < 66) {
            setActiveCardByScroll(1);
        } else {
            setActiveCardByScroll(2);
        }
    }
},[sliderScrollX])



function handleClick(index:number){
    // setIsScrollingByClick(true)
    
    if (sliderRef.current) {
        const visibleWidth = sliderRef.current.clientWidth; 
        const totalScrollableWidth = sliderScrollWidth.current - visibleWidth;
        sliderRef.current.scroll({
            left:(totalScrollableWidth / 2) * index,
            behavior: "smooth"
        })
        // setActiveCardByScroll(index)
    }
    
}


  return (
    <div>
        <div onScroll={()=>setIsScrollingByClick(false)} onTouchStart={()=>setIsScrollingByClick(false)} onMouseDown={()=>setIsScrollingByClick(false)} ref={sliderRef} className='prod-slider flex items-center gap-7 overflow-x-scroll justify-center max-xl:justify-start'>
            {products.map((product)=>(
            <ProductCard
                key={product.id}
                name={product.name}
                desc={product.desc}
                price={product.price}
                img={product.img}
                pathName={product.pathName}
                UUID={product.UUID}
                offer={product.offer}
            />
            ))}
        </div>
    <ul id='slider-scroll-elements-container'>
        <li onClick={()=>handleClick(0)}>
            <div data-active={activeCardByScroll === 0}></div>
        </li>
        <li onClick={()=>handleClick(1)}>
            <div data-active={activeCardByScroll === 1}></div>
        </li>
        <li onClick={()=>handleClick(2)}>
            <div data-active={activeCardByScroll === 2}></div>
        </li>
    </ul>
</div>
  )
}

export default ProductCardsSlider