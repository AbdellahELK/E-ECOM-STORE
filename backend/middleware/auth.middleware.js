import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized - Access token not found' });
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user;
            return next();
        } catch (error) {
            if (error.name === 'TokenExpired') {
                return res.status(401).json({ message: 'Unauthorized - Invalid expired' });
            }

            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
    } catch (error) {
        console.log("error in protect middlewear", error.message);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const adminRoute = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: 'Unauthorized - access denied - Admin only' });
    }
}