import jwt from 'jsonwebtoken';
import User from '../Models/user.models.js';

const protectRoute = async (req, res, next) => {
    

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized-Invalid Token" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protected route middleware:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default protectRoute;
