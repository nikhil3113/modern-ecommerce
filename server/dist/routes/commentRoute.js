"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const commentController_1 = __importDefault(require("../controller/commentController"));
const router = express_1.default.Router();
router.post("/:productId", auth_1.default.userAuth, commentController_1.default.addComment);
router.get("/:productId", commentController_1.default.getComments);
exports.default = router;
