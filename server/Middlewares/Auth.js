const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../Models/User.model")

// auth
exports.auth = async (req, res, next) => {
    try {

        const token = req.header("Authorization")?.replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success: false,
                message: 'Token is missing'
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            console.log("decoded user : ", decode);
            req.user = decode;

        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Token is invalid"
            })
        } 
        next();
    } catch (e) {
        console.log("Error while varifying the token : ", e);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token"
        })
    }
}

// is authorized user
exports.isUser = async (req, res, next) => {
    try {
        if(req.user.accountType !== "user") {
            console.log("trying to access unreachable user route")
            return res.status(400).json({
                success: false,
                message: "You are not authorised to access this route"
            })
        }
        next();
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "User role cannot be varified"
        })
    }
}

// is moderator
exports.isMod = async (req, res, next) => {
    try {
        if(req.user.accountType !== "moderator") {
            console.log("trying to access unreachable moderator route")
            return res.status(400).json({
                success: false,
                message: "You are not authorised to access this route"
            })
        }
        next();
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "User role cannot be varified"
        })
    }
}

// is Admin
exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.accountType !== "admin") {
            console.log("trying to access unreachable admin route")
            return res.status(400).json({
                success: false,
                message: "You are not authorised to access this route"
            })
        }
        next();
    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "User role cannot be varified"
        })
    }
}