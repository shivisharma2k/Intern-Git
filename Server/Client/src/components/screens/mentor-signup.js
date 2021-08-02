import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory, Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const MentorSignup = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [contact,setContact] = useState("")

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

        fetch("/mentor-signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                password,
                email,
                contact
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html:data.message})
                history.push('/admin-mentors')
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
                        <Link to='/admin-mentors' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                        </Link>
                    </div>
                    <div className="mycard">
                        <div className="card auth-card input-field col-lg-4" style={{margin:"60px 0 40px 450px"}}>
                            <br/><h3>Mentor Sign Up</h3><br/>
                            <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                            <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                            <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                            <input type="text" placeholder="contact" value={contact} onChange={(e)=>setContact(e.target.value)}></input>
                            <br/>
                            <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                                Sign Up
                            </button>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}


export default MentorSignup
