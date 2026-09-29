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
            message: "token not provided , Unauthorized access"
        })
    }
let decoded = null
    try{
          decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        res.status(401).json({
            message:"unauthorised access!!"
        })
    }
    console.log(decoded)

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: "img",
        folder:"insta-clone"
    })
    res.send(file)
    console.log("IMAGEKIT RESPONSE:");
    console.log(file);
    console.log("IMAGE URL:");
    console.log(file.url);
    console.log(req.body)


    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    });
    res.status(201).json({
        message: "Post Created successfully!",
        post
    })
}


module.exports = {
    createPost
}