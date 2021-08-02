import React,{useEffect} from 'react';
import NavBar from '../Navbar';
import Footer from '../footer';
import {Link, useHistory} from 'react-router-dom';

const AdminStudentSearch = () =>{
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
    return(   
        <div>
            <NavBar/>
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-8">
                            <br/>
                            <h1>Student Search!</h1>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/admin-students' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                    </div>
                    <div style={{margin:"9% 0% 12% 15%"}}>
                    <h2>Search by <i className="fa fa-search"></i></h2>
                    <Link to='/admin-searchbyname' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Name</Link>
                    <Link to='/admin-searchbymentor' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Mentor</Link>
                    <Link to='/admin-searchbyid' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Roll Id</Link>
                    <Link to='/admin-searchbyyear' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Year</Link>
                    <Link to='/admin-searchbycourse' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Course</Link>
                    <Link to='/admin-searchbybranch' className="links waves-effect waves-light btn-large black adm-btn col-md-3">Branch</Link>
                    
                    </div>
                </div>        
            </div>
            <Footer/>
        </div>
    )
}


export default AdminStudentSearch
