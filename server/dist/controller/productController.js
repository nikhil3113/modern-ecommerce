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
const productController = {
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield prisma_1.default.products.findMany({});
                res.status(200).json(products);
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, description, imageUrl } = req.body;
                if (!name || !price || !description || !imageUrl) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                yield prisma_1.default.products.create({
                    data: {
                        name,
                        price,
                        description,
                        imageUrl
                    }
                });
                res.status(201).json({ message: "Product added successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, price, description, imageUrl } = req.body;
                if (!name || !price || !description || !imageUrl) {
                    return res.status(400).json({ message: "Missing required fields" });
                }
                yield prisma_1.default.products.update({
                    where: {
                        id: id
                    },
                    data: {
                        name,
                        price,
                        description,
                        imageUrl
                    }
                });
                res.status(200).json({ message: "Product updated successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield prisma_1.default.products.delete({
                    where: {
                        id: id
                    }
                });
                res.status(200).json({ message: "Product deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const product = yield prisma_1.default.products.findUnique({
                    where: {
                        id: id
                    }
                });
                res.status(200).json({ product });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
};
exports.default = productController;
