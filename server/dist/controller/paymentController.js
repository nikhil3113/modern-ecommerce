"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const process_1 = __importDefault(require("process"));
const paymentController = {
    createOrder(req, res) {
        try {
            const instance = new razorpay_1.default({
                key_id: process_1.default.env.RAZORPAY_KEY_ID,
                key_secret: process_1.default.env.RAZORPAY_KEY_SECRET
            });
            const options = {
                amount: req.body.amount * 100,
                currency: "INR",
                receipt: crypto_1.default.randomBytes(10).toString("hex"),
            };
            instance.orders.create(options, (error, orders) => {
                if (error) {
                    return res.status(500).json({ message: "Something went wrong during order" });
                }
                res.status(200).json({ data: orders });
            });
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    paymentVerify(req, res) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto_1.default.createHmac("sha256", process_1.default.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");
            // console.log(expectedSign, razorpay_signature);
            if (expectedSign === razorpay_signature) {
                res.status(200).json({ message: "Payment Verified" });
            }
            else {
                res.status(400).json({ message: "Payment Verification Failed" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};
exports.default = paymentController;
