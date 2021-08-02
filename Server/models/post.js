const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types    

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    document:{
        type:String,
    },
    uploadedbyname:{
        type: String,     
        required:true
    },
    uploadedbyid:{
        type: Object,     
        ref:"StudentUser"
    }
})

mongoose.model("UserPost",postSchema)