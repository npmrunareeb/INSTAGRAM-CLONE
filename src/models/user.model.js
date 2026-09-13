const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This username is already takken!"]
    },
    password:{
        
    }
})