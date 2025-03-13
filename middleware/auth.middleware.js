import jwt from "jsonwebtoken";
import User from "../backend/models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            res.status(401).json({message: 'Unauthorized - Access token not found'});
        }
        try{
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if(!user){
                res.status(404).json({message: 'User not found'});
            }
            req.user = user;
            next()
        }catch (error){
            if(error.name === 'TokenExpired'){
                return res.status(401).json({message: 'Unauthorized - Invalid expired'});
            }
            throw error;
        }
    }catch (error) {
        console.log("error in protect middlewear", error.message);
        res.status(401).json({message: 'Unauthorized - Invalid Token'});
    }
}

export const adminRoute = async (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }else {
        return res.status(403).json({message: 'Unauthorized - access denied - Admin only'});
    }
}