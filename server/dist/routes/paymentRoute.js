"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentController_1 = __importDefault(require("../controller/paymentController"));
const router = express_1.default.Router();
router.post("/order", paymentController_1.default.createOrder);
router.post("/verify", paymentController_1.default.paymentVerify);
exports.default = router;
