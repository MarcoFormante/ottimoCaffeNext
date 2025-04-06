import React from 'react'

interface SectionProps {
  children: React.ReactNode
  style?:string
}

export default function Section({children,style}:SectionProps){
  return (
    <section className={`cl-pd-200x mx-auto ${style ?? ""}`}>
        {children}
    </section>
  )
}
