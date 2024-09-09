import express from "express";
import cartController from "../controller/cartController";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/",auth.userAuth, cartController.viewCart)
router.post("/add", auth.userAuth, cartController.addToCart)
router.put("/update", auth.userAuth, cartController.updateCardItem)
router.delete("/delete", auth.userAuth, cartController.deleteCartItem)

export default router;