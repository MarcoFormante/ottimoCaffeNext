import React from 'react'

interface SectionProps {
  children: React.ReactNode
  style?:string
}

export default function Section({children,style}:SectionProps){
  return (
    <section className={`min-lg:w-[100%] min-lg:mx-auto ${style ?? ""}`}>
        {children}
    </section>
  )
}
