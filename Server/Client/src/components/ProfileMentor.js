import React,{useEffect, useState} from 'react';
import { useHistory,Link } from 'react-router-dom';
import NavBar from './Navbar';

const ProfileMentor  = () =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const [data,setData] = useState([])
    const history = useHistory()

    useEffect(()=>{
        if(user){
            if(user.type=="admin"){
                history.push('/profile-admin')
            }
            if(user.type=="student"){
                history.push('/profile-student')
            }
        }
        else{
            history.push('/')
        }    
    },[]) 
    useEffect(()=>{
        fetch('/mentorprofile',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])  

    return(
        <div>
            <NavBar/>
            <div>
                <div style={{marginLeft:"46%", marginTop:"40px"}}>
                    <Link to='/mentor' className="links waves-effect waves-light btn-large pink col-md-2">
                        <i className="fa fa-arrow-left"/> Back
                    </Link>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", margin:"20px 250px", border:"1px solid black", padding:"3% 4%", backgroundColor:'white'}}>
                    <div style={{justifyContent:"center", textAlign:"center"}}>
                        <h2 style={{color:"green", fontSize:"40px"}}><b>{user.name}</b></h2><br/>
                        <img style={{width:"230px", height:"230px", borderRadius:"130px"}} src="/assets/images/mentorprofile.PNG"/>
                    </div>
                    <div>
                        <h4>Email id : {user.email}</h4>
                        <h4>Contact No.: {user.contact}</h4><br/>
                        <h4>Mentees : </h4>
                        <div>
                            {
                            data.map(item=>{
                                return(
                                    <div>
                                        <h5 style={{color:"red"}}><b>{item.name}</b></h5>
                                        <h6>{item.rollid}</h6>
                                        <h6>{item.email}</h6>
                                        <h6>{item.contact}</h6>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMentor