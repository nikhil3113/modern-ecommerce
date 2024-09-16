"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const productRoute_1 = __importDefault(require("./routes/productRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const cartRoute_1 = __importDefault(require("./routes/cartRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const ordersRoute_1 = __importDefault(require("./routes/ordersRoute"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("Server is running");
});
app.use("/api/v1/user", userRoute_1.default);
app.use("/api/v1/product", productRoute_1.default);
app.use("/api/v1/admin", adminRoute_1.default);
app.use("/api/v1/cart", cartRoute_1.default);
app.use("/api/v1/payment", paymentRoute_1.default);
app.use("/api/v1/comment", commentRoute_1.default);
app.use("/api/v1/order", ordersRoute_1.default);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
