import React from 'react'

interface ButtonProps{
    style?:string,
    children?:string | React.ReactElement,
    onClick:()=>void
}

const Button = ({style,children,onClick}:ButtonProps) => {
  return (
    <button onClick={onClick} className={`product-card__button font-semibold cursor-pointer appearance-none ${style}`}>
      {children}
    </button>
  )
}

export default Button