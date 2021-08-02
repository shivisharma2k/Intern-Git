const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')

const requireStudentLogin = require('../middleware/requireStudentLogin')
const requireAdminLogin = require('../middleware/requireAdminLogin')
const requireMentorLogin = require('../middleware/requireMentorLogin')

const UserPost = mongoose.model("UserPost")
const UserTask = mongoose.model("UserTask")
const CompanyUser = mongoose.model("CompanyUser")
const UserIntern = mongoose.model("UserIntern")
const AdminUser = mongoose.model("AdminUser")
const StudentUser = mongoose.model("StudentUser")
const MentorUser = mongoose.model("MentorUser")



router.post('/createtask',requireAdminLogin,(req,res)=>{  
    const {title,body} = req.body
    if(!title || !body){
        return res.status(422).json({error:"please add all the fields"})
    }
    req.user.password = undefined
    const post = new UserTask({
        title,body,
        uploadedbyname:req.user.name,
        uploadedbyid:req.user
    })
    post.save().then(user=>{
        res.json({message:"Task created successfully!"})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/alltasks',requireAdminLogin,(req,res)=>{
    UserTask.find()
    .populate("uploadedby","_id title")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deletetask/:taskId',requireAdminLogin,(req,res)=>{
    UserTask.findOne({_id:req.params.taskId})
    .populate("uploadedbyid","_id")
    .exec((err,task)=>{
        if(err || !task){
            return res.status(422).json({error:err})
        }
            task.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=>{
                console.log(err)
            })
    })
})



router.post('/createcompany',requireAdminLogin,(req,res)=>{  
    const {name,about} = req.body
    if(!name || !about){
        return res.status(422).json({error:"please add all the fields"})
    }
    const post = new CompanyUser({
        name,about,
        uploadedbyname:req.user.name,
        uploadedbyid:req.user
    })
    post.save().then(user=>{
        res.json({message:"Company added successfully!"})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/allcompanies',requireAdminLogin,(req,res)=>{
    CompanyUser.find()
    .populate("uploadedby","_id name")
    .populate("applies","name _id rollid")
    .populate("interns","name _id rollid")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/student-allcompanies',requireAdminLogin,(req,res)=>{
    CompanyUser.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deletecompany/:companyId',requireAdminLogin,(req,res)=>{
    CompanyUser.findOne({_id:req.params.companyId})
    .populate("uploadedbyid","_id")
    .exec((err,company)=>{
        if(err || !company){
            return res.status(422).json({error:err})
        }
            company.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=>{
                console.log(err)
            })
    })
})



router.post('/uploadpost',requireStudentLogin,(req,res)=>{  
    const {title,document} = req.body
    if(!title || !document){
        return res.status(422).json({error:"Please fill all the fields"})
    }   
    req.user.password = undefined
    const post = new UserPost({
        title, 
        document,
        uploadedbyname:req.user.name,
        uploadedbyid:req.user
    })
    post.save().then(result=>{
        res.json({message:"Post uploaded successfully!"})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/alluploads',requireAdminLogin,(req,res)=>{
    UserPost.find()
    .populate("uploadedby","_id title")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/myuploads',requireStudentLogin,(req,res)=>{
        UserPost.find({uploadedbyid:req.user._id})
        .populate("uploadedby","_id title")
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=>{
            console.log(err)
        })
})
router.delete('/deleteupload/:uploadId',requireAdminLogin,(req,res)=>{
    UserPost.findOne({_id:req.params.uploadId})
    .populate("uploadedbyid","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
            post.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=>{
                console.log(err)
            })
    })
})



router.get('/mentorprofile',requireMentorLogin,(req,res)=>{
    StudentUser.find({mentor:req.user._id})
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deletementor/:mentorId',requireAdminLogin,(req,res)=>{
    MentorUser.findOne({_id:req.params.mentorId})
    .exec((err,mentor)=>{
        if(err || !mentor){
            return res.status(422).json({error:err})
        }
            mentor.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=>{
                console.log(err)
            })
    })
})
router.get('/studentprofile',requireStudentLogin,(req,res)=>{
    MentorUser.find({_id:req.user.mentor})
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})



router.put('/apply',requireStudentLogin,(req,res)=>{
    CompanyUser.findByIdAndUpdate(req.body.applyId,{
        $push:{applies:req.user._id}
    },{
        new:true,
        useFindAndModify:false,
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})
router.get('/allrequests',requireAdminLogin,(req,res)=>{
    CompanyUser.find()
    .populate("applies","_id company name rollid")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.put('/accept-request',requireAdminLogin,(req,res)=>{
    console.log(req.body.companyId)
    console.log(req.body.studentId)
    CompanyUser.findByIdAndUpdate(req.body.companyId,{
        $push:{interns:req.body.studentId},
        $pull:{applies:req.body.studentId},
    },{
        new:true,
        useFindAndModify:false,
    })
    .exec((err,result)=>{
        console.log(result)
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})



router.get('/namesearch/:name',requireAdminLogin,(req,res)=>{
    StudentUser.find({name:req.params.name})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/idsearch/:id',requireAdminLogin,(req,res)=>{
    StudentUser.find({rollid:req.params.id})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/emailsearch/:email',requireAdminLogin,(req,res)=>{
    StudentUser.find({email:req.params.email})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/yearsearch/:year',requireAdminLogin,(req,res)=>{
    StudentUser.find({year:req.params.year})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/coursesearch/:course',requireAdminLogin,(req,res)=>{
    StudentUser.find({course:req.params.course})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/branchsearch/:branch',requireAdminLogin,(req,res)=>{
    StudentUser.find({branch:req.params.branch})
    .populate("mentor","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/mentorsearch/:mentor',requireAdminLogin,(req,res)=>{
    MentorUser.find({name:req.params.mentor})
    .then(mentor=>{
        MentorUser.find({_id:mentor})
        .then(mentorid=>{
            StudentUser.find({mentor:mentorid})
            .populate("mentor","_id name")
            .then(posts=>{
                res.json({posts})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        
    })
})
router.delete('/deletestudent/:studentId',requireAdminLogin,(req,res)=>{
    StudentUser.findOne({_id:req.params.studentId})
    .exec((err,task)=>{
        if(err || !task){
            return res.status(422).json({error:err})
        }
            task.remove()
            .then(result=>{
                res.json({result})
            })
            .catch(err=>{
                console.log(err)
            })
    })
})

    


module.exports = router

