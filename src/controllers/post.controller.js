const postModel = require("../models/post.model")

const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostControllerFunction(req, res) {

    try {

     

        const file = await imagekit.files.upload({
            file: await toFile(
                Buffer.from(req.file.buffer),
                "file"
            ),
            fileName: "img"
        })

        const post = await postModel.create({
            caption: req.body.caption,
            imgUrl: file.url,
            user: req.user.id
        })

        res.status(201).json({
            message: "Post created successfully",
            post: post
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: "Something went wrong while creating post",
            error: error.message
        })

    }
}

module.exports = {
    createPostControllerFunction
}