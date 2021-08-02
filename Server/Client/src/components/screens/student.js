import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const Student = () =>{
    const history = useHistory()
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
    return(
        <div>
            <NavBar/>
            <div className="jumbotron">
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-8">
                            <br/>
                            <h1>Welcome Student!</h1>
                        </div>
                    </div>
                    <br/>
                    <Link to='/student-companies' className="waves-effect waves-light btn-large black adm-btn links">Companies</Link>
                    <Link to='/student-announcements' className="waves-effect waves-light btn-large black adm-btn links">Announcements</Link>
                    <br/><br/>
                </div>        
            </div>
            <div className="container">
                <div class="row">
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/studentbg.png" alt="Admin"/>
                                <span class="card-title" style={{marginBottom:"45.7%"}}>Strive for progress, not perfection.</span>
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


export default Student
