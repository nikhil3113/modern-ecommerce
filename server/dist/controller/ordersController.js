"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const OrderController = {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const { amount, cartId } = req.body;
                const cart = yield prisma_1.default.cart.findUnique({
                    where: {
                        id: cartId
                    }
                });
                if (!cart) {
                    return res.status(404).json({ message: "Cart not found" });
                }
                const order = yield prisma_1.default.orders.create({
                    data: {
                        userId,
                        totalAmount: amount,
                        cartId,
                    }
                });
                res.status(201).json({ message: "Order Created", data: order });
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    },
    getOrdersByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const orders = yield prisma_1.default.orders.findMany({
                    where: {
                        userId
                    },
                    include: {
                        cart: {
                            include: {
                                items: {
                                    include: {
                                        product: true
                                    }
                                }
                            }
                        },
                        user: true
                    }
                });
                res.status(200).json({ data: orders });
            }
            catch (error) {
                res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
};
exports.default = OrderController;
