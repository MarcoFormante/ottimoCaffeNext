"use client"

import { Jost } from "next/font/google"
import React from "react"
import "@/app/styles/styles.css"
import Header from "../components/Admin/Header/Header"


const jost = Jost({
    adjustFontFallback:true,
    subsets:["latin"]
  })



export default function Layout({
    children,
    }:Readonly<{
        children:React.ReactElement
    }>){
    return (
       
            <div className={`${jost.className} admin fixed left-0 top-0 w-full h-full overflow-y-auto overflow-x-hidden bg-[#F5F5F5]`}>
                <Header/>
                {children}
            </div>
        
    )
}