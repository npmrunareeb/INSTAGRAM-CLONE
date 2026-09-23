const express = require("express")
const userModel = require("../models/users.model")
const authRouter = express.Router()
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
authRouter.post("/register", async (req, res) => {
    const { userName, email, phoneNumber, profilePic, bio , password } = req.body
    const userAlreadyExits = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })
    if (userAlreadyExits) {
        return res.status(409).json({
            message: "User is already Exits " + (userAlreadyExits.email === email ? "email already exits" : "Username already exits")
        })
    }

const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        userName,
        email,
        bio,
        profilePic,
        phoneNumber,
        password: hash
    })
 
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token" , token)

    res.status(409).json({
        message:"user successfully registered!!",
        user:{
            email:user.email,
            username:user.userName,
            bio:user.bio,
            profilePic:user.profilePic,
            phoneNumber:user.phoneNumber
        }
    })
})
module.exports = authRouter