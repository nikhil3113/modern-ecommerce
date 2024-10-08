"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/signup", userController_1.default.signup);
router.post("/login", userController_1.default.login);
router.get("/", auth_1.default.userAuth, userController_1.default.UserDetails);
router.put("/update", auth_1.default.userAuth, userController_1.default.Update);
exports.default = router;
