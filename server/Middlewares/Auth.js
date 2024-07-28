const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Models/User.model");

// auth
exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log("token : ", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      console.log("decoded user : ", decode);
      req.user = decode;
      next(); // Proceed to the next middleware or route handler
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired",
      });
    }
  } catch (e) {
    console.log("Error while verifying the token: ", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// is authorized user
exports.isUser = async (req, res, next) => {
  try {
    if (req.user.accountType !== "user" && req.user.accountType !== "admin") {
      console.log("trying to access unreachable user route");
      return res.status(400).json({
        success: false,
        message: "You are not authorised to access this route",
      });
    }
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};

// is Admin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "admin") {
      console.log("trying to access unreachable admin route");
      return res.status(400).json({
        success: false,
        message: "You are not authorised to access this route",
      });
    }
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "User role cannot be verified",
    });
  }
};