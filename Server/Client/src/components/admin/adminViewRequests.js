import React,{useEffect, useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminViewRequests = () =>{
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
        fetch('/allrequests',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])   

    const accept = (cid,sid) =>{
        fetch('/accept-request',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                companyId:cid,
                studentId:sid
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        }).catch(err=>{
            console.log(err)
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
                            <h1>Internship Requests!</h1>
                            <br/>
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
                                    
                                    <div class="row col-md-12">
                                    <div class="col-md-12">
                                      <div class="card-panel white">
                                        <h3 className="black" style={{color:"white", padding:"1%"}}>{item.name}</h3><br/>
                                        {
                                            item.applies.map(value=>{
                                                return(
                                                    <div className="row" style={{padding:"0px 35px"}}>
                                                        <h6>{value.name}, {value.rollid}</h6>
                                                        <button className="btn-small waves-effect waves-light green ml-3"
                                                            onClick={()=>accept(item._id,value._id)}>
                                                            <i className="fa fa-check"></i>
                                                        </button>
                                                        <br/>
                                                    </div>
                                                )
                                            })
                                        }
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


export default AdminViewRequests
