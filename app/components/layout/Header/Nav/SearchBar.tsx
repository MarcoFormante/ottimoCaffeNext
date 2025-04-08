import React from 'react'

const SearchBar = ({onClick}:{onClick:(state:boolean)=>void}) => {
    
  return (
    <div className='searchBar absolute '>
      <input  autoFocus className='relative focus:appearance-none z-10 w-full right appearance-none h-[48px] rounded-[4px] pl-4 bg-white-primary' placeholder='Cerca prodotti' type="search" name="search" id="search" /> 
    <div className='flex justify-center items-center h-full w-fit  absolute z-10  right-4  gap-4 top-0'>
        <span className='content-center cursor-pointer' onClick={()=>onClick(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="22" height="22" rx="11" stroke="#292F6C" stroke-width="2"/>
              <path d="M8 17L7 16L11 12L7 8L8 7L12 11L16 7L17 8L13 12L17 16L16 17L12 13L8 17Z" fill="#292F6C"/>
            </svg>
        </span>
        <span className='content-center cursor-pointer'>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.6 2.13333C5.47627 2.13333 2.13333 5.47627 2.13333 9.6C2.13333 13.7237 5.47627 17.0667 9.6 17.0667C13.7237 17.0667 17.0667 13.7237 17.0667 9.6C17.0667 5.47627 13.7237 2.13333 9.6 2.13333ZM0 9.6C0 4.29806 4.29806 0 9.6 0C14.902 0 19.2 4.29807 19.2 9.6C19.2 11.8595 18.4194 13.9366 17.1133 15.5765L21.0236 19.5151C21.4387 19.9332 21.4362 20.6086 21.0182 21.0236C20.6001 21.4387 19.9248 21.4362 19.5097 21.0182L15.6079 17.0881C13.9632 18.4094 11.8739 19.2 9.6 19.2C4.29807 19.2 0 14.902 0 9.6Z" fill="#292F6C"/>
          </svg>
        </span>
    </div>
</div>
  )
}

export default SearchBar