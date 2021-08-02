import React,{useEffect} from 'react';
import { useHistory,Link } from 'react-router-dom';
import NavBar from './Navbar';

const ProfileAdmin  = () =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const history = useHistory()

    useEffect(()=>{
        if(user){
            if(user.type=="student"){
                history.push('/profile-student')
            }
            if(user.type=="mentor"){
                history.push('/profile-mentor')
            }
        }
        else{
            history.push('/')
        }    
    },[]) 

    return(
        <div>
            <NavBar/>
            <div>
                <div style={{marginLeft:"46%", marginTop:"50px"}}>
                    <Link to='/admin' className="links waves-effect waves-light btn-large pink col-md-2">
                        <i className="fa fa-arrow-left"/> Back
                    </Link>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", margin:"20px 300px", border:"1px solid black", padding:"4%", backgroundColor:'white'}}>
                    <div style={{justifyContent:"center", textAlign:"center"}}>
                        <img style={{width:"200px", height:"200px", borderRadius:"100px"}} src="/assets/images/adminprofile.PNG"/>
                    </div>
                    <div>
                        <div>
                        <h2 style={{color:"green", fontSize:"40px"}}><b>{user.name}</b></h2><br/>
                            <h4>Email id : {user.email}</h4>
                            <h4>Institution : {user.institution}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAdmin