import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory, Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const StudentSignup = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [year,setYear] = useState("")
    const [course,setCourse] = useState("")
    const [branch,setBranch] = useState("")
    const [rollid,setRollId] = useState("")
    const [contact,setContact] = useState("")
    const [mentor,setMentor] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            if(user.type=="student"){
                history.push('/student')
            }
            if(user.type=="mentor"){
                history.push('/mentor')
            }
        }
        else{
            history.push('/')
        }    
    },[])  

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email"})
            return 
        }
        if(!/\+?\d[\d -]{8,12}\d/.test(contact)){
            M.toast({html:"invalid phone number"})
            return
        }
        fetch("/student-signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                password,
                email,
                year,
                course,
                branch,
                rollid,
                contact,
                mentor
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html:data.message})
                history.push('/admin-students')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <NavBar/>
                <div>
                    <div className="row">
                        <div style={{marginLeft:"0", marginTop:"10px"}}>
                            <Link to='/admin-students' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                        <div className="mycard md-12">
                            <div className="card auth-card input-field col-lg-6" style={{margin:"50px 0 50px 450px", padding:"4%"}}>
                                <h3>Student Sign Up</h3><br/>
                                <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                                <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                                <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                                <input type="text" placeholder="year" value={year} onChange={(e)=>setYear(e.target.value)}></input>
                                <input type="text" placeholder="course" value={course} onChange={(e)=>setCourse(e.target.value)}></input>
                                <input type="text" placeholder="branch"value={branch} onChange={(e)=>setBranch(e.target.value)}></input>
                                <input type="text" placeholder="roll id" value={rollid} onChange={(e)=>setRollId(e.target.value)}></input>
                                <input type="text" placeholder="contact" value={contact} onChange={(e)=>setContact(e.target.value)}></input>
                                <input type="text" placeholder="mentor" value={mentor} onChange={(e)=>setMentor(e.target.value)}></input>
                                <br/>
                                <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>  
            
            <Footer/>
        </div>
    )
}


export default StudentSignup
