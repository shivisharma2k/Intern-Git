import React,{useState,useContext,useEffect} from 'react';
import {UserContext} from '../../App'
import {Link,useHistory} from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../footer';
import M from 'materialize-css'

const AdminLogin = () =>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            if(user.type=="student"){
                history.push('/student')
            }
            if(user.type=="admin"){
                history.push('/admin')
            }
            if(user.type=="mentor"){
                history.push('/mentor')
            }
        }
        else{
            history.push('/admin-signin')
        }    
    },[])  

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email"})
            return 
        }
        fetch("/admin-signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json",  
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed In Successfully"})
                history.push('/admin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div>
            <NavBar/>
            <div className="mycard">
                <div className="card auth-card input-field" style={{marginTop:"82px"}}>
                    <h3>Admin Log In</h3><br/>
                    <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <h6>
                        <Link to="/adminreset" style={{color:"red"}}>Forgot password?</Link>
                    </h6><br/>
                    <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                        Log In
                    </button>
                    <br/>
                    <h6>
                        <Link to="/student-signin">Student</Link>
                    </h6>
                    <h6>
                        <Link to="/mentor-signin">Mentor</Link>
                    </h6>
                </div>
            </div>
            <br/><br/><br/><br/>
            <Footer/>
        </div>
    )
}


export default AdminLogin
