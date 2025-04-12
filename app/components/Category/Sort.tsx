import React from 'react'

const Sort = () => {

    
  return (
    <div className='flex  items-center '>
       input: 
        <select id='sort' className='font-bold focus:outline-0'>
            <option value="Prezzo-decrescente">Prezzo decrescente</option>
            <option value="Prezzo-crescente">Prezzo crescente</option>
            <option value="Prezzo-decrescente">Prezzo decrescente</option>
            <option value="Prezzo-decrescente">Prezzo decrescente</option>
         </select>
         <label htmlFor="sort">
         <span className='cursor-pointer' >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 12.175L7 -3.93402e-07L9 -3.0598e-07L9 12.175L14.6 6.575L16 8L8 16L-3.49691e-07 8L1.4 6.575L7 12.175Z" fill="#292F6C"/>
                </svg>
            </span>
         </label>
        
    </div>
  
  )
}

export default Sort