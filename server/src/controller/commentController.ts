import { Request,Response } from "express";
import prisma from "../prisma";

const commentController ={
    async addComment(req:Request, res:Response){
        try {
            const userId = req.user?.userId;
            const{productId} = req.params;
            const{content, headline} = req.body;


            if(!userId || !productId || !content){
                return res.status(400).json({message:"Missing required fields"});
            }

            await prisma.comment.create({
                data:{
                    content,
                    userId,
                    productId,
                    headline
                },
                select: {
                    id: true,
                    content: true,
                    createdAt: true,
                    user: {
                      select: {
                        username: true, 
                      },
                    },
                  },
            })

            res.status(201).json({message:"Comment added"});

        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async getComments(req:Request, res:Response){
        try {
            const {productId} = req.params;
            const comments = await prisma.comment.findMany({
                where:{
                    productId
                },
                select:{
                    content:true,
                    headline:true,
                    createdAt:true,
                    user:{
                        select:{
                            username: true
                        }
                    }
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
            res.status(200).json({comments});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },
}

export default commentController;