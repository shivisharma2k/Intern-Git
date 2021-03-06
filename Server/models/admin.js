const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    institution:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

mongoose.model("AdminUser",adminSchema)