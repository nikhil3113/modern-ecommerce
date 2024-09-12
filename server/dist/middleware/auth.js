"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// import adminAuth from "./adminAuth";
dotenv_1.default.config();
const auth = {
    userAuth(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(403).json({ message: "Authorization header missing" });
            }
            const words = token.split(" ");
            const jwtToken = words[1];
            if (!jwtToken) {
                return res.status(403).json({ message: "Token missing" });
            }
            try {
                const decodedValue = jsonwebtoken_1.default.verify(jwtToken, process.env.SECRET);
                if (decodedValue && decodedValue.username) {
                    req.user = decodedValue;
                    // console.log(req.user)
                    next();
                }
                else {
                    res.status(401).send("Unauthorized User");
                }
            }
            catch (err) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    res.status(403).json({ message: "Token expired" });
                }
                else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                    res.status(403).json({ message: "Malformed token" });
                }
                else {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    adminAuth(req, res, next) {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: "Authorization header missing" });
            }
            const words = token.split(" ");
            const jwtToken = words[1];
            if (!jwtToken) {
                return res.status(401).json({ message: "Token missing" });
            }
            const decodedValue = jsonwebtoken_1.default.verify(jwtToken, process.env.SECRET);
            if (decodedValue && decodedValue.username && decodedValue.role === "ADMIN") {
                req.user = decodedValue;
                // console.log(req.user)
                next();
            }
            else {
                res.status(401).send("Unauthorized User");
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};
exports.default = auth;
