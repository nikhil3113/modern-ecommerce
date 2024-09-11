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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminController = {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const existingUser = yield prisma_1.default.user.findFirst({
                    where: {
                        email
                    }
                });
                if (existingUser) {
                    return res.status(400).json({ message: "User already exists" });
                }
                const user = yield prisma_1.default.user.create({
                    data: {
                        username,
                        email,
                        password: hashedPassword,
                        role: client_1.Role.ADMIN
                    }
                });
                const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: "1h" });
                res.status(201).json({ message: "Admin created successfully", token });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    },
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield prisma_1.default.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user) {
                    return res.status(400).json({ message: "User does not exist" });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.status(400).json({ message: "Invalid Password" });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id, username: user.username, email: user.email, role: user.role }, process.env.SECRET, { expiresIn: "30d" });
                res.status(200).json({ message: "Admin logged in successfully", token });
            }
            catch (error) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
};
exports.default = adminController;
