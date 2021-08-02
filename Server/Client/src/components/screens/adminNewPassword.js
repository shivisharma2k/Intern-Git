import React,{useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../footer';
import M from 'materialize-css'

const AdminNewPassword = () =>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()

    const PostData = () =>{
        fetch("/admin-new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json",  
            },
            body:JSON.stringify({
                password,
                token
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
                    <h3>Admin - Create new password</h3><br/>
                    <input type="password" placeholder="enter new password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                    <br/>
                    <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                        Update
                    </button>
                    <br/>
                </div>
            </div>
            <br/><br/><br/><br/>
            <Footer/>
        </div>
    )
}


export default AdminNewPassword
