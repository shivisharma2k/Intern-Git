import React,{useState,useEffect, useContext} from 'react';
import {Link,useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';
import { UserContext } from '../../App'

const StudentCompanies = () =>{
    const [data,setData] = useState([])
    const history = useHistory()
    const {state,dispatch}= useContext(UserContext)

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            if(user.type=="admin"){
                history.push('/admin')
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
        fetch('/student-allcompanies',{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[]) 
    
    const ApplyAt = (id) =>{
        fetch('/apply',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                applyId:id
            })
        }).then(res=>res.json())
        .then(result=>{
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
                            <h1>All Companies!</h1>
                            <br/>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/student' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                    </div>
                    <div className="uploads">
                        {
                            data.map(item=>{
                            console.log(state._id)
                                return(
                                    <div class="row col-md-12">
                                    <div class="col-md-12">
                                      <div class="card-panel white">
                                        <h5>{item.name}</h5>
                                        <h6>{item.about}</h6><br/>
                                        <h6>{item.applies.length} students have applied.</h6>
                                        {item.applies.includes(state._id)
                                            ?   <button className="btn waves-effect waves-light pink login-btn" 
                                                disabled style={{margin:"0"}}>
                                                    Applied
                                                </button>
                                            :   item.interns.includes(state._id)
                                                ?   <button className="impbtn btn waves-effect waves-light login-btn" 
                                                    disabled style={{margin:"0"}}>
                                                        Selected
                                                    </button>
                                                :   <button className="btn waves-effect waves-light pink login-btn" 
                                                    onClick={()=>ApplyAt(item._id)} style={{margin:"0"}}>
                                                        Apply
                                                    </button>
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


export default StudentCompanies
