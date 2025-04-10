"use server"

import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient()

export async function createProduct(data:Product): Promise<Product> {
    return await prisma.product.create({data})
    
} 

 
export async function getProduts():Promise<Product[]>{
    const data = await prisma.product.findMany({
        where:{
            name:{
                startsWith:"mac"
            }
        }
    })
    return data
}


