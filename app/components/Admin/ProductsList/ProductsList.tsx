import CategoriesList from "./CategoriesList"
import { ProductCardProps } from '../../common/ProductCard/ProductCard';
import Image from "next/image";
import Loading from "../common/Loading/Loading";
import Error from "../common/Error/Error";
import React from "react";

interface ProductsListProps{
    products:ProductCardProps[],
    isPending:boolean,
    error:{
        message:string,
        color:"red"|"gray"|""
    },
    search:string,
    searchActive:boolean
}

export default function ProductsList({products,isPending,error,search,searchActive}:ProductsListProps){
    {if (isPending) return <Loading/>}
    {if (!isPending && error.message) return <Error message={error.message} color={error.color}/>}
    if (!products.length && !error.message) return <Error message={"Nessun Prodotto Trovato"} color={"gray"}/>
        
    function FindText(text:string){
        if (searchActive) {
            const regex = text.match(new RegExp(search,"gi"))
         
            const newText = regex?.map(r => text.replace(r,(/[A-Z]/.test(r) ? "Matchione" : "matchino")))[0]
           
            return (
                <p className="text-sm text-slate-500">
                {newText?.includes("Matchione") ?
                <>
                   { newText?.split("Matchione")[0]}
                   <span className=" bg-amber-300 capitalize">{search}</span>
                   { newText?.split("Matchione")[1]}
                </> :
                newText?.includes("matchino") ?
                    <>
                    { newText?.split("matchino")[0]}
                    <span className=" bg-amber-300">{search}</span>
                    { newText?.split("matchino")[1]}
                    </> 
                    :
                    <p className="text-sm text-slate-500">{text}</p>
                }
                   
                </p>
            )
        }else{
            return (
                <p className="text-sm text-slate-500">{text}</p>
            )
        }
    }
  
    return (
        <div hidden={!products.length} className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <CategoriesList/>
                    <tbody>
                        {products.map((product:ProductCardProps,i:number)=>{
                            return (
                                <tr key={i} className="hover:bg-slate-50 border-b border-slate-200">
                                    <td className="p-4 py-5">
                                        <Image src={"/assets/images/products/"+ product.image_url} width={40} height={40} alt=""/>
                                    </td>
                                    <td className="p-4 py-5">
                                       {FindText(product.name)}
                                    </td>
                                    <td className="p-4 py-5">
                                        {FindText(product.slug)}
                                    </td>
                                    <td className="p-4 py-5">
                                        {FindText(product.code)}
                                    </td>
                                    <td className="p-4 py-5">
                                        {FindText(product.description || "")}
                                    </td>
                                    <td className="p-4 py-5">
                                        {FindText(product.category)}
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.price}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.offer || 0} </p>
                                    </td>

                                    <td className="p-4 py-5">
                                       {product.active &&  <p className="text-sm  border text-center bg-green-400 text-amber-50 p-1">Attivo</p>}
                                       {!product.active && <p className="text-sm  border text-center bg-red-400 text-amber-50 p-1">Inattivo</p>}
                                    </td>

                                    <td className="p-4 ">
                                        <button className="cursor-pointer  relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" aria-hidden="true" className="h-4 w-4">
                                                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </td>

                                    <td className="p-4">
                                        <button className=" cursor-pointer relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                            <div className="w-4 ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                        </button>
                                    </td>

                                    <td className="p-4">
                                        <button className="cursor-pointer relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20" type="button">
                                            <div className="w-4 ml-3 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="red">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
    )
}