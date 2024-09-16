"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartController_1 = __importDefault(require("../controller/cartController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/", auth_1.default.userAuth, cartController_1.default.viewCart);
router.post("/add", auth_1.default.userAuth, cartController_1.default.addToCart);
router.put("/update", auth_1.default.userAuth, cartController_1.default.updateCardItem);
router.delete("/delete", auth_1.default.userAuth, cartController_1.default.deleteCartItem);
router.delete("/clear", auth_1.default.userAuth, cartController_1.default.clearCart);
exports.default = router;
