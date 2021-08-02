import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import NavBar from '../Navbar';
import Footer from '../footer';

const Home = () =>{
    const history = useHistory()
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            if(user.type=="student"){
                history.push('/student')
            }
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
                            <h1>Intern Manager!</h1>
                            <h5>Here to ease your Internship Management</h5>
                        </div>
                    </div>
                    <br/>
                </div>       
                <div className="container">
                <div class="row">
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/admin.PNG" alt="Admin"/>
                            </div>
                            <div class="card-content">
                                <h3><b>20% off on Continental</b></h3>
                            </div>
                            <div class="card-action">
                                <Link to="/admin-signin">Admin Log In</Link>
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/student.PNG" alt="Student"/>
                            </div>
                            <div class="card-content">
                                <p>Strive for progress, not perfection.</p>
                            </div>
                            <div class="card-action">
                                <Link to="/student-signin">Student Log In</Link>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/mentor.PNG"  alt="Mentor"/>
                            </div>
                            <div class="card-content">
                                <p>A mentor is someone who allows to see the hope inside yourself.</p>
                            </div>
                            <div class="card-action">
                                <Link to="/mentor-signin">Mentor Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <br></br>
            <Footer/>
        </div>
    )
}


export default Home
