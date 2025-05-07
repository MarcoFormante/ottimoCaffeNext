'use client'
interface PaginationProps{
    pagination:number,
    totalProducts:number,
    productsLength:number,
    setPage:React.Dispatch<React.SetStateAction<number>>,
    page:number
}

export default function Pagination({
    pagination,
    totalProducts,
    setPage,
    page
}:PaginationProps
){
    const hasMoreThenTenProducts =  totalProducts % 10;
 
    return (
        <div hidden={!totalProducts} className="flex justify-between items-center px-4 py-3">
                    <div className="text-sm text-slate-500">
                        <p>Pagina {page} di {pagination} /  <b>{totalProducts}</b> prodotti totali</p>
                    </div>
                    <div className="flex space-x-1">
                        <button 
                            onClick={()=>setPage(page - 1)} 
                            disabled={page <= 1 || page <= 1 } 
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded  transition duration-200 ease ${page <= 1 ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-50 hover:border-slate-400"}`}
                            >
                            Prev
                        </button>
                        {pagination >= 0 && Array.from({length:pagination + 1 + (hasMoreThenTenProducts && 1)}).map((_,i)=>{
                            const pageNumber = i 
                            return pageNumber !== 0 && (
                                <button 
                                key={pageNumber} 
                                onClick={()=>setPage(pageNumber)} 
                                className={`cursor-pointer px-3 py-1 min-w-9 min-h-9 text-sm font-normal  ${page ===  pageNumber ? "bg-slate-800 border border-slate-800 text-white  " : "text-slate-500  border-slate-200  hover:border-slate-400 "}  border  rounded  transition duration-200 ease`}
                                >
                                    {pageNumber}
                                </button>
                            )
                        })}
                    
                        <button 
                            onClick={()=>setPage(page + 1)} 
                            disabled={page >= pagination}  
                            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded  transition duration-200 ease ${page >= pagination  ? "cursor-not-allowed" : "cursor-pointer hover:bg-slate-50 hover:border-slate-400"}`}
                            >
                            Next
                        </button>
                    </div>
            </div>
    )
}