import express, { Express, Request, Response } from "express";
import userController from "../controller/userController";

const router = express.Router();

router.post("/signup",userController.signup);
router.post("/login",userController.login);

export default router