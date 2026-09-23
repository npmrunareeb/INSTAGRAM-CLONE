const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username is already exists"],
        required: [true, "Username is required!!"]
    }
    , email: {
        type: String,
        unique: [true, "account is already exits with this email!"],
        required: [true, "email is required!"]
    }, phoneNumber: {
        type: Number,
        required: [true, "Number is required"]
    }, profilePic: {
        type: String,
        default: "https://ik.imagekit.io/f0n6p3h3u/Default_pfp.jpg?updatedAt=1788217764944"
    },
    password: {
        type: String,
        required: [true, "password is required!!"]
    }
})