import React,{useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminMentors = () =>{
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
                            <h1>Mentor Page!</h1>
                        </div>
                        <div style={{marginLeft:"auto", marginRight:"2.5%", marginTop:"3%"}}>
                            <Link to='/admin' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>
                    </div>
                    <br/>
                    <Link to='/mentor-signup' className="links waves-effect waves-light btn-large black adm-btn">Sign up a mentor</Link>
                    <Link to='/admin-viewmentors' className="links waves-effect waves-light btn-large black adm-btn">Mentors</Link>
                    <br/><br/>
                </div>        
            </div>
            
            <div className="container">
                <div class="row">
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/adminbg.png" alt="Admin"/>
                                <span class="card-title" style={{marginBottom:"42.6%"}}>No one is more cherished in this world than someone who lightens the burden of another.</span>
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default AdminMentors