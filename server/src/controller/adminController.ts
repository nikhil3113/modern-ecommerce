import prisma from "../prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const adminController = {
    async  createAdmin(req:Request, res:Response){
        try {
            const{username,email,password}:{username:string; email:string; password:string} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            const existingUser = await prisma.user.findFirst({
                where:{
                    email
                }
            })
            if(existingUser){
                return res.status(400).json({message:"User already exists"});
            }
           const user =  await prisma.user.create({
                data:{
                    username,
                    email,
                    password: hashedPassword,
                    role:  Role.ADMIN
                }
            })
            const token = jwt.sign({userId: user.id,username:user.username,email:user.email, role:user.role},process.env.SECRET as string,{expiresIn:"1h"});

            res.status(201).json({message:"Admin created successfully", token});
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
    },
    async adminLogin(req:Request, res:Response){
        try {
            const{email, password}:{email:string; password:string} = req.body
            const user = await prisma.user.findUnique({
                where:{
                    email
                }
            })
            if(!user){
                return res.status(400).json({message:"User does not exist"});
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(400).json({message:"Invalid Password"});
            }
            const token = jwt.sign({userId: user.id,username:user.username,email:user.email, role:user.role},process.env.SECRET as string,{expiresIn:"30d"});

            res.status(200).json({message:"Admin logged in successfully", token});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    }
}

export default adminController;