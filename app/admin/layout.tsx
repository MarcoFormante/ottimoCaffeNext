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
        <html lang="it">
            <body className={`${jost.className} admin`}>
                <Header/>
                {children}
            </body>
        </html>
    )
}