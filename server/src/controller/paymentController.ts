import Razorpay from "razorpay";
import crypto from "crypto";
import process from "process";
import { Request, Response } from "express";

const paymentController = {
    createOrder(req:Request, res:Response) {
        try {
            const instance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID as string,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            });
            const options = {
                amount : req.body.amount * 100,
                currency : "INR",
                receipt : crypto.randomBytes(10).toString("hex"),
            }

            instance.orders.create(options, (error, orders)=>{
                if(error){
                    return res.status(500).json({ message: "Something went wrong during order" });
                }
                res.status(200).json({data: orders});
            })

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    paymentVerify(req:Request, res:Response){
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string).update(sign.toString()).digest("hex");
            // console.log(expectedSign, razorpay_signature);
            if(expectedSign === razorpay_signature){
                res.status(200).json({ message: "Payment Verified" });
            }else{
                res.status(400).json({ message: "Payment Verification Failed" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default paymentController;