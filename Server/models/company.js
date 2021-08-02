const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    applies:[{type:ObjectId,ref:"StudentUser"}],
    interns:[{type:ObjectId,ref:"StudentUser"}],
    uploadedbyname:{
        type: String,     
        required:true
    },
    uploadedbyid: {
        type: Object,     
        ref:"AdminUser"
    }
})

mongoose.model("CompanyUser",companySchema)