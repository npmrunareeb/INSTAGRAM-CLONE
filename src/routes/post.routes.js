const express = require("express")
const postRouter = express.Router()

const postController = require("../controllers/post.controller")
const authMiddleware = require("../middleware/auth.middleware")

const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage()
})

postRouter.post(
    "/",
    authMiddleware,
    upload.single("img"),
    postController.createPostControllerFunction
)

module.exports = postRouter