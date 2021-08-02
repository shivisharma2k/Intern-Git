import React,{useState,useContext,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../footer';
import M from 'materialize-css'

const AdminReset = () =>{
    const history = useHistory()
    const [email,setEmail] = useState("")


    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email"})
            return 
        }
        fetch("/admin-reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json",  
            },
            body:JSON.stringify({
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html: data.message})
                history.push('/admin-signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div>
            <NavBar/>
            <div className="mycard">
                <div className="card auth-card input-field" style={{marginTop:"140px", marginBottom:"70px"}}>
                    <h3>Admin - Reset Password</h3><br/>
                    <input type="text" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <br/>
                    <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                        Reset Password
                    </button>
                    <br/>
                </div>
            </div>
            <br/><br/><br/><br/>
            <Footer/>
        </div>
    )
}


export default AdminReset
