const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const internSchema = new mongoose.Schema({
    companyid:{
        type: ObjectId,     
        ref:"CompanyUser"
    },
    studentid:{
        type: ObjectId,     
        ref:"StudentUser"
    },
    companyname:{
        type: String,     
        required:true
    },
    studentname:{
        type: String,     
        required:true
    }
})

mongoose.model("UserIntern",internSchema)