import initMongoose from "../../../../lib/mongoose";
import Product from "../../../../models/Products";
import {NextResponse} from 'next/server'

export async function findAllProducts(){
    return Product.find()
}

export async function GET(){
    return NextResponse.json(findAllProducts)
}
