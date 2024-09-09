import prisma from "../prisma";
import { Request, Response } from "express";

const productController = {
    async  getProducts(req:Request, res:Response){
        try {
            const products = await prisma.products.findMany({})
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async addProduct(req:Request, res:Response){
        try {
            const{name,price,description,imageUrl} = req.body;
            if(!name || !price || !description || !imageUrl){
                return res.status(400).json({message:"Missing required fields"});
            }
            await prisma.products.create({
                data:{
                    name,
                    price,
                    description,
                    imageUrl
                }
            })
            res.status(201).json({message: "Product added successfully"});
        } catch (error) {   
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async updateProduct(req:Request, res:Response){
        try {
            const{id} = req.params;
            const{name,price,description,imageUrl}: {name:string, price:number, description:string, imageUrl:string} = req.body;
            if(!name || !price || !description || !imageUrl){
                return res.status(400).json({message:"Missing required fields"});
            }
            await prisma.products.update({
                where:{
                    id:id
                },
                data:{
                    name,
                    price,
                    description,
                    imageUrl
                }
            })
            res.status(200).json({message: "Product updated successfully"});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async deleteProduct(req:Request, res:Response){
        try {
            const{id} = req.params;
            await prisma.products.delete({
                where:{
                    id:id
                }
            })
            res.status(200).json({message: "Product deleted successfully"});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async getProductById(req:Request, res:Response){
        try {
            const {id} = req.params;
            const product = await prisma.products.findUnique({
                where:{
                    id:id
                }
            })
            res.status(200).json({product});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    }
}

export default productController;