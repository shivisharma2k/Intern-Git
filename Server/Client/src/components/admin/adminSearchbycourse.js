import React, {useState} from 'react';
import NavBar from '../Navbar';
import Footer from '../footer';
import {Link} from 'react-router-dom'

const AdminSearchbycourse = () =>{
    const [course,setCourse] = useState("")
    const [data,setData] = useState([])

    const Search = () =>{
        fetch(`/coursesearch/${course}`,{
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
            console.log(result.posts)
        })
    }
    const deletestudent = (studentId)=>{
        fetch(`/deletestudent/${studentId}`,{
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
            <div className="jumbotron" style={{minHeight:"545px"}}>
                <div className="row row-header">
                    <div>
                            <Link to='/admin-studentsearch' className="links waves-effect waves-light btn-large pink col-md-6" 
                                style={{marginLeft:"190px"}}>
                                <i className="fa fa-arrow-left"/> Back
                            </Link>
                    </div>
                    <div class="input-field row"  style={{margin:"0.5% 0% 0% 42%"}}>
                            <input type="text" placeholder=" search by course" className="white" value={course} onChange={(e)=>setCourse(e.target.value)}
                                style={{width:"300px", border:"2px solid black", borderRadius:"25px 0px 0px 25px",paddingLeft:"20px"}}>
                            </input> 
                    </div>
                    <div>           
                            <button className="btn-small waves-effect black" onClick={()=>Search()}
                                style={{height:"49px", borderRadius:"0px 25px 25px 0px", boxShadow:"none", marginTop:"15%"}}>
                                <i className="fa fa-search"></i> 
                            </button>
                    </div>
                    
                </div>  
                    <div className="container">
                        <div className="row">
                        {
                            data.map(item=>{
                                return(
                                    <div class="row col-md-12">
                                    <div class="col-md-12">
                                      <div class="card-panel white row">
                                        <div>
                                            <h5 style={{marginBottom:"15px"}}> <b>{item.name}</b> </h5>
                                            <h6> ID : {item.rollid} </h6>
                                            <h6> Email : {item.email} </h6>
                                            <h6> Contact : {item.contact} </h6>
                                            <h6> Mentor : {item.mentor.name} </h6>
                                            <button className="btn-small waves-effect waves-light red" 
                                                onClick={()=>deletestudent(item._id)}>
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


export default AdminSearchbycourse
