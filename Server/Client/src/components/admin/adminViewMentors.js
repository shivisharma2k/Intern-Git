import React,{useEffect, useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminViewMentors = () =>{
    const [data,setData] = useState([])
    const history = useHistory()

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
    useEffect(()=>{
        fetch('/allmentors',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])   

    const deleteMentor = (mentorId)=>{
        fetch(`/deletementor/${mentorId}`,{
            method:"delete",
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.filter(item=>{
                return result._id
            })
            setData(newData)
        })
    }

    return(
        <div>
            <NavBar/>
            <div className="jumbotron" style={{minHeight:"550px"}}>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-6">
                            <br/>
                            <h1>All Mentors!</h1>
                            <br/>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/admin-mentors' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                    </div>
                    <div className="uploads">
                        {
                            data.map(item=>{
                                console.log(item)
                                return(
                                    <div class="row col-md-12">
                                    <div class="col-md-12">
                                      <div class="card-panel white row">
                                      <div>
                                            <h5><b>{item.name} </b></h5>
                                            <h6> {item.email}</h6>
                                            <h6> {item.contact}</h6>
                                        </div>
                                        <div style={{marginLeft:"auto", marginRight:"0"}}>
                                            <button className="btn-small waves-effect waves-light red" 
                                                onClick={()=>deleteMentor(item._id)}>
                                                <i className="fa fa-trash-o"></i>  
                                            </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                            })
                        }
                    </div>
                </div>        
            </div>
            

            <Footer/>
        </div>
    )
}


export default AdminViewMentors
