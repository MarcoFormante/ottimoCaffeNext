'use client'

import Pagination from "@/app/components/common/Pagination/Pagination"
import { ProductCardProps } from "@/app/components/common/ProductCard/ProductCard"
import productsJson from "@/public/products.json"
import Image from "next/image"
import CategoryOption from "../../components/common/CategoryOption/CategoryOption"
import {Suspense} from "react"

export default function Products(){
    const products = JSON.parse(JSON.stringify(productsJson))
    const totalProducts = 52
    const pagination = Math.round(totalProducts / 10)
    
    return (
<div>
    <div className=" mx-auto">
        <div className="w-full p-10">
            <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                <div className=" pt-5 ml-5 mb-5">
                <Suspense fallback={"loading"}>
                    <CategoryOption/>
                </Suspense>
                
                </div>
                <div className="ml-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                    <div className="relative">
                        <input
                        className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                        placeholder="Carca prodotto..."
                        />
                        <button
                        className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                        type="button"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        
            <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                    <tr>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                IMG
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Nome
                            </p>
                        </th>

                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                SLUG
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Codice
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Descrizione
                            </p>
                        </th>

                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Categoria
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Prezzo
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Offerta
                            </p>
                        </th>

                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Stato
                            </p>
                        </th>

                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Modifica
                            </p>
                        </th>

                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Preview
                            </p>
                        </th>
                        <th className="p-4 border-b border-slate-200 bg-slate-50">
                            <p className="text-sm font-normal leading-none text-slate-500">
                                Elimina
                            </p>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {products.map((product:ProductCardProps,i:number)=>{
                            return (
                                <tr key={i} className="hover:bg-slate-50 border-b border-slate-200">
                                    <td className="p-4 py-5">
                                        <Image src={"/assets/images/products/"+ product.img} width={40} height={40} alt=""/>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.name}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.slug}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.UUID}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.desc}</p>
                                    </td>
                                    <td className="p-4 py-5">
                                        <p className="text-sm text-slate-500">{product.category}</p>
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
            <Suspense fallback={"loading"}>
                <Pagination 
                    pagination={pagination} 
                    totalProducts={totalProducts}
                    productsLength={products.length}
                />
            </Suspense>
            </div>
        </div>
    </div>
</div>
    )
}