const express = require("express")
const userModel = require("../models/users.model")
const authRouter = express.Router()
const crypto = require("crypto")

authRouter.post("/register", async (req, res) => {
    const { userName, email, phoneNumber, profilePic, bio } = req.body
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
        password: hash
    })

})
