import jwt from "jsonwebtoken";

import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized Token Required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) throw new Error("User not Found");
    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired Token" });
  }
};
