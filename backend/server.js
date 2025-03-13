import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    connectToDb();
});
