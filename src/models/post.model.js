const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        required:[true,"img url is required to creating an post!"]

    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user is is required for creating an post!!"]
    }

})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel