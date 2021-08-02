import React,{useEffect, useState} from 'react';
import NavBar from './Navbar';
import { useHistory,Link } from 'react-router-dom';

const ProfileStudent  = () =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const [data,setData] = useState([])
    const history = useHistory()
    
    useEffect(()=>{
        if(user){
            if(user.type=="admin"){
                history.push('/profile-admin')
            }
            if(user.type=="mentor"){
                history.push('/profile-mentor')
            }
        }
        else{
            history.push('/')
        }    
    },[])   

    useEffect(()=>{
        fetch('/studentprofile',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts[0])
        })
    },[])  
    
    return(
        <div>
            <NavBar/>
            <div>
                <div style={{marginLeft:"46%", marginTop:"50px"}}>
                    <Link to='/student' className="links waves-effect waves-light btn-large pink col-md-2">
                        <i className="fa fa-arrow-left"/> Back
                    </Link>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", margin:"30px 250px", border:"1px solid black", padding:"4%", backgroundColor:'white'}}>
                <div style={{justifyContent:"center", textAlign:"center"}}>
                    <h2 style={{color:"green", fontSize:"40px"}}><b>{user.name}</b></h2>
                    <img style={{width:"230px", height:"230px", borderRadius:"150px"}} src="/assets/images/studentprofile.PNG"/>
                </div>
                <div>
                    <div>
                        <h4>Email id : {user.email}</h4>
                        <h4>Year : {user.year}</h4>
                        <h4>Course : {user.course}</h4>
                        <h4>Branch : {user.branch}</h4>
                        <h4>Roll Id : {user.rollid}</h4>
                        <h4>Contact No.: {user.contact}</h4>
                        <br/>
                        <h5 style={{color:"red"}}>Mentor name : {data.name}</h5>
                        <h6>Mentor email id : {data.email}</h6>
                        <h6>Mentor contact no.: {data.contact}</h6>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default ProfileStudent