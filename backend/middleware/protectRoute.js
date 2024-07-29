import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-new-netflix"];
    console.log(token);

    if (!token) {
      return res.status(404).json({
        success: false,
        messsage: "Unauthorized access - No token provided",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET_PHRASE);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access - Invalid token provided",
      });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
