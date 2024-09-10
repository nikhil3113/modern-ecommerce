import express, {Express, Request, Response} from 'express';
import user from './routes/userRoute';
import product from './routes/productRoute';
import admin from './routes/adminRoute';
import cart from "./routes/cartRoute";
import payment from "./routes/paymentRoute";
import comment from "./routes/commentRoute";
import cors from 'cors';

const app:Express = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1/user",user)
app.use("/api/v1/product",product)
app.use("/api/v1/admin",admin)
app.use("/api/v1/cart",cart)
app.use("/api/v1/payment",payment)
app.use("/api/v1/comment",comment)

app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
