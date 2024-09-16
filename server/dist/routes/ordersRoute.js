"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const ordersController_1 = __importDefault(require("../controller/ordersController"));
const router = express_1.default.Router();
router.get("/", auth_1.default.userAuth, ordersController_1.default.getOrdersByUser);
router.post("/", auth_1.default.userAuth, ordersController_1.default.createOrder);
exports.default = router;
