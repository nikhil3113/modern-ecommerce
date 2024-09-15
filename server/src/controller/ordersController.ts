import { Request, Response } from "express";
import prisma from "../prisma";

const OrderController = {
    async createOrder(req:Request, res:Response) {
        try {
            const userId = req.user?.userId;
            const{ amount, cartId } = req.body;
            const cart = await prisma.cart.findUnique({
                where:{
                    id: cartId
                }
            })
            if(!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            const order = await prisma.orders.create({
                data:{
                    userId,
                    totalAmount: amount,
                    cartId,
                }
            })
          
            res.status(201).json({ message: "Order Created", data: order });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    async getOrdersByUser(req:Request, res:Response) {
        try {
            const userId = req.user?.userId
            const orders = await prisma.orders.findMany({
                where:{
                    userId
                },
                include:{
                    cart:{
                        include:{
                            items:{
                                include:{
                                    product:true
                                }
                            }
                        }
                    },
                    user: true
                }
            })
            res.status(200).json({ data: orders})
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default OrderController;