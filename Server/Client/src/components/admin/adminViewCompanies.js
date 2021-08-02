import React,{useEffect, useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminViewCompanies = () =>{
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
        fetch('/allcompanies',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])   

    const deleteCompany = (companyId)=>{
        fetch(`/deletecompany/${companyId}`,{
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
                            <h1>All Companies!</h1>
                            <br/>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/admin-companies' className="links waves-effect waves-light btn-large pink col-md-12">
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
                                      <div class="card-panel white row">
                                        <div>
                                            <h5><b>{item.name}</b></h5>
                                            <h6> {item.about}</h6>
                                            <br/><h6 style={{color:"red"}}>INTERNS - </h6>
                                            {
                                            item.interns.map(value=>{
                                                return(
                                                    <div>
                                                        <h6>{value.name}, {value.rollid}</h6>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                        <div style={{marginLeft:"auto", marginRight:"0"}}>
                                            <button className="btn-small waves-effect waves-light red" 
                                                onClick={()=>deleteCompany(item._id)}>
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


export default AdminViewCompanies
