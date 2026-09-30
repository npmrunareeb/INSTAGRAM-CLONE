const express = require('express');
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({storage : multer.memoryStorage()});
const postController = require("../controllers/post.controller")



postRouter.post('/', upload.single("img") , postController.createPost)
 postRouter.get('/',postController.getPosts)
postRouter.get('/details/:postId',postController.getPostDetails)


module.exports = postRouter