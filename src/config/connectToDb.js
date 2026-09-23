const mongoose = require("mongoose")

async function connectToDB(){
await mongoose.connect(process.env.MONGO_URI)
console.log("data base connected successfully!!")
}
 module.exports  = {connectToDB}