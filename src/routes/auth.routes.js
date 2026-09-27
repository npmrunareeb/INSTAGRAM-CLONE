const express = require("express")
const authRouter = express.Router()

const {
    registerControllerFunction,
    loginControllerFunction,
    logoutControllerFunction
} = require("../controllers/auth.controller")

authRouter.post("/register", registerControllerFunction)

authRouter.post("/login", loginControllerFunction)

authRouter.post("/logout", logoutControllerFunction)

module.exports = authRouter