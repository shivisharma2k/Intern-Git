const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')

const AdminUser = mongoose.model("AdminUser")
const StudentUser = mongoose.model("StudentUser")
const MentorUser = mongoose.model("MentorUser")

const requireAdminLogin = require('../middleware/requireAdminLogin')

const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API,EMAIL} = require('../config/keys')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))


router.post('/student-signup',requireAdminLogin,(req,res)=>{
    const {name,email,year,course,branch,rollid,password,contact,mentor} = req.body
    if(!name || !email || !year || !course || !rollid || !password || !contact || !mentor){
        return res.status(422).json({error:"please add all the required fields"})
    }
    StudentUser.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            MentorUser.findOne({name:mentor})
            .then((fetchedMentor)=>{
                if(fetchedMentor){
                    const user = new StudentUser({
                        name,email,year,course,branch,rollid,contact,type:"student",
                        mentor:fetchedMentor._id,
                        password:hashedpassword
                    })
                    const original = password
                    user.save().then(user=>{
                        transporter.sendMail({
                            to:user.email,
                            from:"shivisharma@jklu.edu.in",
                            subject:"Signup success",
                            html:`<h1>Welcome to Intern-Manager.</h1></br><h5>Your password is : ${original}<h5>`
                        })
                        return res.json({message:"Saved successfully!"})
                    })
                }
                else{
                    return res.status(422).json({error:"Invalid Mentor"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/student-signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    StudentUser.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,type,year,course,branch,rollid,contact,mentor} = savedUser
                res.json({token,user:{_id,name,email,type,year,course,branch,rollid,contact,mentor}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


router.post('/mentor-signup',requireAdminLogin,(req,res)=>{
    const {name,email,password,contact} = req.body
    if(!name || !email || !password || !contact){
        return res.status(422).json({error:"please add all the required fields"})
    }
    MentorUser.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new MentorUser({
                name,email,contact,type:"mentor",
                password:hashedpassword
            })
            const original = password
            user.save().then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shivisharma@jklu.edu.in",
                    subject:"Signup success",
                    html:`<h1>Welcome to Intern-Manager.</h1></br><h5>Your password is : ${original}<h5>`
                })
                res.json({message:"Saved successfully!"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/mentor-signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    MentorUser.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // return res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,type,contact} = savedUser
                res.json({token,user:{_id,name,email,type,contact}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
router.get('/allmentors',requireAdminLogin,(req,res)=>{
    MentorUser.find()
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/admin-signup',(req,res)=>{
    const {name,email,password,institution} = req.body
    if(!name || !email || !password || !institution){
        return res.status(422).json({error:"please add all the required fields"})
    }
    AdminUser.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }
        const original = password
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new AdminUser({
                name,email,institution,type:"admin",
                password:hashedpassword
            })
            user.save().then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shivisharma@jklu.edu.in",
                    subject:"Signup success",
                    html:`<h1>Welcome to Intern-Manager.</h1></br><h5>Your password is : ${original}<h5>`
                })
                res.json({message:"Saved successfully!"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
router.post('/admin-signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please add email or password"})
    }
    AdminUser.findOne({email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,type,institution} = savedUser
               res.json({token,user:{_id,name,email,type,institution}})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


router.post('/admin-reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        const link = EMAIL+"/adminreset/"+token
        AdminUser.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exists with this email."})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shivisharma@jklu.edu.in",
                    subject:"Password Reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>Link to reset password</h5>
                    <a>${link}</a>
                    `
                })
                res.json({message:"Check your mail."})
            })
        })
    })
})
router.post('/mentor-reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        const link = EMAIL+"/mentorreset/"+token
        MentorUser.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exists with this email."})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shivisharma@jklu.edu.in",
                    subject:"Password Reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>Link to reset password</h5>
                    <a>${link}</a>
                    `
                })
                res.json({message:"Check your mail."})
            })
        })
    })
})
router.post('/student-reset-password',(req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        const link = EMAIL+"/studentreset/"+token
        StudentUser.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User don't exists with this email."})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"shivisharma@jklu.edu.in",
                    subject:"Password Reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>Link to reset password</h5>
                    <a>${link}</a>
                    `
                })
                res.json({message:"Check your mail."})
            })
        })
    })
})


router.post('/admin-new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    AdminUser.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired."})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken =  undefined
            user.save().then((savedUser)=>{
                res.json({message:"Password updated successfully."})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/mentor-new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    MentorUser.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired."})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken =  undefined
            user.save().then((savedUser)=>{
                res.json({message:"Password updated successfully."})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})
router.post('/student-new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    StudentUser.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired."})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
            user.password = hashedpassword
            user.resetToken = undefined
            user.expireToken =  undefined
            user.save().then((savedUser)=>{
                res.json({message:"Password updated successfully."})
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router