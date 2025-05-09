import React from 'react'

interface HeaderProps{
    name:string,
    code:string
}

const Header = ({name,code}:HeaderProps) => {
  return (
        <div>
            <header>
                <h1 className="text-2xl font-bold text-blue-text">Ottimo Caffè <br/> 
                   {name}
                </h1>  
            </header>
            <p className="mt-4 text-blue-text">Codice articolo: {code}</p>  
        </div>
  )
}

export default Header