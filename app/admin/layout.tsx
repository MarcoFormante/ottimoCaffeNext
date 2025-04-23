import { Jost } from "next/font/google"
import React from "react"
import "@/app/styles/styles.css"
import { signOut } from '@/auth';

const jost = Jost({
    adjustFontFallback:true,
    subsets:["latin"]
  })

export default function RootLayout({
    children,
    }:Readonly<{
        children:React.ReactElement
    }>){
    return (
        <html lang="it">
            <body className={`${jost.className}`}>
                <header>
                    <button onClick={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                }}>SIGNOUT</button>
                </header>
                {children}
            </body>
        </html>
    )
}