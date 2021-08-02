const mongoose = require('mongoose')
const mentorSchema = new mongoose.Schema({
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
    contact:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

mongoose.model("MentorUser",mentorSchema)