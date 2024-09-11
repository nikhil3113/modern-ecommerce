"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controller/productController"));
const router = express_1.default.Router();
router.get("/", productController_1.default.getProducts);
router.post("/add", productController_1.default.addProduct);
router.put("/update/:id", productController_1.default.updateProduct);
router.get("/details/:id", productController_1.default.getProductById);
exports.default = router;
