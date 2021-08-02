import React,{useEffect, useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminStudentUploads = () =>{
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
        fetch('/alluploads',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])    
    
    const deletePost = (postId)=>{
        fetch(`/deleteupload/${postId}`,{
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
                            <h1>All Uploads!</h1>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/admin-students' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                    </div>
                    
                    <div className="uploads">
                        {
                            data.map(item=>{
                                return(
                                    <div className="card items" key={item._id}> 
                                        <a href={item.document}>
                                            <h5>{item.uploadedbyname}</h5>
                                            <h6>{item.title}</h6>
                                        </a>
                                        <div className="card-image">
                                            <img src={item.document} style={{maxHeight:"180px"}}/>
                                        </div>   
                                        <div style={{margin:"auto"}}>
                                            <button className="btn-small waves-effect waves-light red" 
                                                onClick={()=>deletePost(item._id)}>
                                                <i className="fa fa-trash-o"></i>  
                                            </button> 
                                        </div>            
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                </div> 
                <br/>       
            </div>
            

            <Footer/>
        </div>
    )
}


export default AdminStudentUploads
