import { Request,Response } from "express";
import prisma from "../prisma";

const cartController = {
    async addToCart(req:Request, res:Response){
        const userId= req.user?.userId;
        const {productId, quantity} = req.body

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: 'Missing userId, productId or quantity' });
          }

          try {
            let cart = await prisma.cart.findUnique({
                where:{
                    userId
                },
                include:{
                    items:true
                }
            })

            if(!cart){
                cart = await prisma.cart.create({
                    data:{
                        userId,
                        items: {
                            create: []
                        }
                    },
                    include: {
                        items: true
                    }
                })
            }

            const existingCartItem = await prisma.cartItem.findFirst({
                where:{
                    cartId: cart.id,
                    productId
                }
            })
            if(existingCartItem){
                await prisma.cartItem.update({
                    where:{
                        id: existingCartItem.id
                    },
                    data:{
                        quantity: existingCartItem.quantity + quantity
                    }
                })
            }else{
                await prisma.cartItem.create({
                    data:{
                        cartId: cart.id,
                        productId,
                        quantity
                    }
                })
            }
        res.status(200).json({message: "Product added to cart successfully"});

          } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
            
          }
    },

    async viewCart(req:Request, res:Response){
        const userId = req.user?.userId;
        // console.log(userId)
        if(!userId){
            return res.status(400).json({message:"Missing userId"});
        }

        try {
            const cart = await prisma.cart.findUnique({
                where:{
                    userId
                },
                include:{
                    items:{
                        include:{
                            product:true
                        }
                    }
                }
            })

            if(!cart){
                return res.status(404).json({message:"Cart not found"});
            }

            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },
    async updateCardItem(req:Request,res:Response){
        const {cartItemId, quantity} = req.body;
        console.log(cartItemId, quantity)
        if(!cartItemId || quantity==undefined){
            return res.status(400).json({message:"Missing cartItemId or quantity"});
        } 
        try {
            await prisma.cartItem.update({
                where:{
                    id:cartItemId
                },
                data:{
                    quantity
                }
            })
            res.status(200).json({message:"Cart item updated successfully"});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async deleteCartItem(req:Request, res:Response){
        const {cartItemId} = req.body;
        if(!cartItemId){
            return res.status(400).json({message:"Missing cartItemId"});
        }
        try {
            await prisma.cartItem.delete({
                where:{
                    id:cartItemId
                }
            })
            res.status(200).json({message:"Cart item deleted successfully"});
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
    },
    async clearCart(req:Request, res:Response){
        try {
            const userId = req.user?.userId;
            if(!userId){
                return res.status(400).json({message:"Not Authorized"});
            }
            await prisma.cartItem.deleteMany({
                where:{
                    cart:{
                        userId
                    }
                }
            })
            res.status(200).json({message:"Cart cleared successfully"});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    }

    
}

export default cartController;