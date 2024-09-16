import express from "express";
import userController from "../controller/userController";
import auth from "../middleware/auth";
import adminController from "../controller/adminController";
import OrderController from "../controller/ordersController";


const router = express.Router();

router.get("/get", auth.userAuth,OrderController.getOrdersByUser);
router.post("/",auth.userAuth, OrderController.createOrder)

export default router