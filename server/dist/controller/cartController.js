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
const cartController = {
    addToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            const { productId, quantity } = req.body;
            if (!userId || !productId || !quantity) {
                return res.status(400).json({ message: 'Missing userId, productId or quantity' });
            }
            try {
                let cart = yield prisma_1.default.cart.findUnique({
                    where: {
                        userId
                    },
                    include: {
                        items: true
                    }
                });
                if (!cart) {
                    cart = yield prisma_1.default.cart.create({
                        data: {
                            userId,
                            items: {
                                create: []
                            }
                        },
                        include: {
                            items: true
                        }
                    });
                }
                const existingCartItem = yield prisma_1.default.cartItem.findFirst({
                    where: {
                        cartId: cart.id,
                        productId
                    }
                });
                if (existingCartItem) {
                    yield prisma_1.default.cartItem.update({
                        where: {
                            id: existingCartItem.id
                        },
                        data: {
                            quantity: existingCartItem.quantity + quantity
                        }
                    });
                }
                else {
                    yield prisma_1.default.cartItem.create({
                        data: {
                            cartId: cart.id,
                            productId,
                            quantity
                        }
                    });
                }
                res.status(200).json({ message: "Product added to cart successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    viewCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
            // console.log(userId)
            if (!userId) {
                return res.status(400).json({ message: "Missing userId" });
            }
            try {
                const cart = yield prisma_1.default.cart.findUnique({
                    where: {
                        userId
                    },
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                });
                if (!cart) {
                    return res.status(404).json({ message: "Cart not found" });
                }
                res.status(200).json(cart);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    updateCardItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cartItemId, quantity } = req.body;
            console.log(cartItemId, quantity);
            if (!cartItemId || quantity == undefined) {
                return res.status(400).json({ message: "Missing cartItemId or quantity" });
            }
            try {
                yield prisma_1.default.cartItem.update({
                    where: {
                        id: cartItemId
                    },
                    data: {
                        quantity
                    }
                });
                res.status(200).json({ message: "Cart item updated successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    deleteCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cartItemId } = req.body;
            if (!cartItemId) {
                return res.status(400).json({ message: "Missing cartItemId" });
            }
            try {
                yield prisma_1.default.cartItem.delete({
                    where: {
                        id: cartItemId
                    }
                });
                res.status(200).json({ message: "Cart item deleted successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    clearCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId) {
                    return res.status(400).json({ message: "Not Authorized" });
                }
                yield prisma_1.default.cartItem.deleteMany({
                    where: {
                        cart: {
                            userId
                        }
                    }
                });
                res.status(200).json({ message: "Cart cleared successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
};
exports.default = cartController;
