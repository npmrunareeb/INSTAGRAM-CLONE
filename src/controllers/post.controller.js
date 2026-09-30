const postModel = require("../models/post.model")
const imageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const imagekit = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPost(req, res) {

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "token not provided, Unauthorized access"
        })
    }

    let decoded = null

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "unauthorised access!!"
        })
    }

    const file = await imagekit.files.upload({
        file: await toFile(
            Buffer.from(req.file.buffer),
            "file"
        ),
        fileName: "img",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post Created successfully!",
        post
    })
}
async function getPosts(req, res) {

    const token = req.cookies.token
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        res.status(401).json({
            message: "token invalid!"
        })
    }
    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "post fetched successfully",
        posts
    })
}
async function getPostDetails(req, res) {
    token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "unauthorized user!"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }

    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(401).json({
            message: "post not found"
        })
    }
    const isValidUser = post.user.toString() == userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({
        message:"post fetched successfully",
        post
    })

}


module.exports = {
    createPost,
    getPosts,
    getPostDetails
}