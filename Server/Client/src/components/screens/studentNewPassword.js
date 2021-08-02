import React,{useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import NavBar from '../Navbar';
import Footer from '../footer';
import M from 'materialize-css'

const StudentNewPassword = () =>{
    const history = useHistory()
    const [password,setPassword] = useState("")
    const {token} = useParams()

    const PostData = () =>{
        fetch("/student-new-password",{
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
                history.push('/student-signin')
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div>
            <NavBar/>
            <div className="mycard">
                <div className="card auth-card input-field" style={{marginTop:"135px", marginBottom:"47px"}}>
                    <h3>Student - Create new password</h3><br/>
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


export default StudentNewPassword
