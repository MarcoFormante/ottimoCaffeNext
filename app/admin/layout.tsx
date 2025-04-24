"use client"

import { Jost } from "next/font/google"
import React from "react"
import "@/app/styles/styles.css"


const jost = Jost({
    adjustFontFallback:true,
    subsets:["latin"]
  })


  async function signout(){
    try {
      const res = await fetch("/auth/signout",{
        method:"POST"
      })
      if (res.ok) {
          window.location.href = "/login";
      }else{
        console.log("Error during LOGOUT");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        console.log("Error during LOGOUT");
    }
  }

export default function RootLayout({
    children,
    }:Readonly<{
        children:React.ReactElement
    }>){
    return (
        <html lang="it">
            <body className={`${jost.className}`}>
                <header>
                    <button onClick={signout}>LOGOUT</button>
                </header>
                {children}
            </body>
        </html>
    )
}