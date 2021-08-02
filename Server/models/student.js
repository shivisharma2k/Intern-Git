const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types 

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:false
    },
    rollid:{
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
    mentor:{
        type: ObjectId,     
        ref:"MentorUser"
    },
    type:{
        type:String,
        required:true
    }
})
mongoose.model("StudentUser",studentSchema)