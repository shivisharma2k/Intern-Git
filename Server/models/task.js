const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    uploadedbyname:{
        type: String,     
        required:true
    },
    uploadedbyid:{
        type: Object,     
        ref:"AdminUser"
    }
})

mongoose.model("UserTask",taskSchema)