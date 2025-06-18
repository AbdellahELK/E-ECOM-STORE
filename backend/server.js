import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectToDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';
import cookieParser from 'cookie-parser';




const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    connectToDb();
});
