import React from 'react'

interface HeaderProps{
    name:string,
    UUID:string
}

const Header = ({name,UUID}:HeaderProps) => {
  return (
        <div>
            <header>
                <h1 className="text-2xl font-bold text-blue-text">Ottimo Caffè <br/> 
                   {name}
                </h1>  
            </header>
            <p className="mt-4 text-blue-text">Codice articolo: {UUID}</p>  
        </div>
  )
}

export default Header