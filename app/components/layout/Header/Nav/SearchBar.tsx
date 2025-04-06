import React from 'react'

const SearchBar = ({onClick}:{onClick:(state:boolean)=>void}) => {
    
  return (
    <div className='searchBar absolute w-[100%] -left-[48px]'>
    <input autoFocus className='relative z-10 w-full right appearance-none h-[48px] rounded-[4px] pl-4 bg-white-primary' placeholder='Cerca prodotti' type="search" name="search" id="search" /> 
    <div className='flex justify-end w-fit  absolute z-10  right-2  gap-4 top-1'>
        <span className='rounded-2xl cursor-pointer w-[40] h-[40] border-2' onClick={()=>onClick(false)}>X</span>
        <span className='rounded-2xl cursor-pointer w-[40] h-[40] border-2'></span>
    </div>
</div>
  )
}

export default SearchBar