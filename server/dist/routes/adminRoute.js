"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controller/adminController"));
const router = express_1.default.Router();
// router.post("/signup", adminController.createAdmin);
router.post("/login", adminController_1.default.adminLogin);
exports.default = router;
