import React,{useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminViewInterns = () =>{
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
        fetch('/allinterns',{
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
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-6">
                            <br/>
                            <h1>All Interns!</h1>
                            <br/>
                        </div>
                    </div>
                    <div className="uploads">
                        {
                            data.map(item=>{
                                return(
                                    <div class="row col-md-12">
                                    <div class="col-md-12">
                                      <div class="card-panel white">
                                        <h5>{item.studentname}</h5>
                                        <h6>{item.companyname}</h6>
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


export default AdminViewInterns
