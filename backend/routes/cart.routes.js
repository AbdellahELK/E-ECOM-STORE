import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { addToCart, getAllCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";

const router = express.Router();

router.get('/', protectRoute, getAllCartProducts);
router.post('/', protectRoute, addToCart);
router.put('/:id', protectRoute, updateQuantity);
router.put('/:id', protectRoute, removeAllFromCart);

export default router