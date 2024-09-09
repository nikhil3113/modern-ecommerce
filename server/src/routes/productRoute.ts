import express, { Express, Request, Response } from "express";
import userController from "../controller/userController";
import productController from "../controller/productController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", productController.getProducts)
router.post("/add", productController.addProduct)
router.put("/update/:id", productController.updateProduct)
router.get("/details/:id", productController.getProductById)

export default router