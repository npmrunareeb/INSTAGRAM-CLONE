const postModel = require("../models/post.model")
const imageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new imageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPost(req , res){
    
    const file = await imagekit.files.upload({
        file : await toFile(Buffer.from(req.file.buffer) , "file"),
        fileName : "Test"
    })
    res.send(file)
}


module.exports = {
    createPost
}