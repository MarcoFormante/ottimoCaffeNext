'use client'
import React, { useEffect, useRef, useState } from 'react'

interface SliderProps{
    children:React.ReactElement
}

const Slider = ({children}:SliderProps) => {
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
        if (sliderRef.current) {
            const visibleWidth = sliderRef.current.clientWidth; 
            const totalScrollableWidth = sliderScrollWidth.current - visibleWidth;
            sliderRef.current.scroll({
                left:(totalScrollableWidth / 2) * index,
                behavior: "smooth"
            })
        }
    }
    
    
      return (
        <div>
            <div 
                onScroll={()=>setIsScrollingByClick(false)} 
                onTouchStart={()=>setIsScrollingByClick(false)} 
                onMouseDown={()=>setIsScrollingByClick(false)} 
                ref={sliderRef} 
                className='prod-slider flex items-center gap-7 max-[1116px]:overflow-x-scroll justify-center  max-[1116px]:justify-start'
            >
                {children}
                
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

export default Slider