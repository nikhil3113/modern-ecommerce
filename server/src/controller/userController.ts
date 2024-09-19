import prisma from "../prisma";
import { Role } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface User{
    username:string;
    email:string;
    password:string;
}

const userController = {
    async signup(req:Request, res:Response){
        try {
            const{username,email,password}:User = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            if(!username || !email || !password){
                return res.status(400).json({message:"Missing required fields"});
            }
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
                    role:  Role.USER
                }
            })
            const token = jwt.sign({userId: user.id,username:user.username,email:user.email, role:user.role},process.env.SECRET as string,{expiresIn:"30d"});

            res.status(201).json({message:"User created successfully", token});
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
        
    },
    async login (req:Request, res:Response){
        try {
            const{email,password}:User = req.body;
            if(!email || !password){
                return res.status(400).json({message:"Missing required fields"});
            }
            const user = await prisma.user.findUnique({
                where:{
                    email
                },
            })
            if(!user){
                return res.status(400).json({message:"User does not exist"});
            }
            if(user.role !== Role.USER){
                return res.status(400).json({message:"User does not exist"});
            }
            const isPasswordValid = await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(400).json({message:"Invalid Password"});
            }
            const token = jwt.sign({userId: user.id,username:user.username,email:user.email, role:user.role},process.env.SECRET as string,{expiresIn:"30d"});

            res.status(200).json({message:"User logged in successfully", token});
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Internal Server Error"});
        }
    },
    async UserDetails(req:Request, res:Response){
        try {
            const id = req.user?.userId;
            if(!id){
                return res.status(400).json({message:"Not Authorized"});
            }
            const user = await prisma.user.findUnique({
                where:{
                    id
                },
                select:{
                    username:true,
                    email:true
                }
            })
            
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    },

    async Update(req:Request, res:Response){
        try {
            const id = req.user?.userId;
            const {username} = req.body;
            if(!id){
                return res.status(400).json({message:"Not Authorized"});
            }
            if(!username){
                return res.status(400).json({message:"Missing required fields"});
            }
            await prisma.user.update({
                where:{
                    id
                },
                data:{
                    username
                }
            })
            res.status(200).json({message:"User updated successfully"});    
        } catch (error) {
            res.status(500).json({error:"Internal Server Error"});
        }
    }
}

export default userController;