import express, { Express, Request, Response } from "express";
import userController from "../controller/userController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.get("/",auth.userAuth, userController.UserDetails);

export default router