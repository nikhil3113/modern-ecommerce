import express from "express";
import auth from "../middleware/auth";
import paymentController from "../controller/paymentController";


const router = express.Router();

router.post("/order", paymentController.createOrder);
router.post("/verify", paymentController.paymentVerify)

export default router