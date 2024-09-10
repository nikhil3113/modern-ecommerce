import express from "express";
import auth from "../middleware/auth";
import adminController from "../controller/adminController";
import commentController from "../controller/commentController";


const router = express.Router();

router.post("/:productId",auth.userAuth,  commentController.addComment)
router.get("/:productId",  commentController.getComments)

export default router