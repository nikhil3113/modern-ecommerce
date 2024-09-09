import express from "express";
import userController from "../controller/userController";
import auth from "../middleware/auth";
import adminController from "../controller/adminController";


const router = express.Router();

// router.post("/signup", adminController.createAdmin);
router.post("/login",adminController.adminLogin);

export default router