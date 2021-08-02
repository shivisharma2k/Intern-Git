import React, { useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const Mentor = () =>{
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
                            <h1>Welcome Mentor!</h1>
                        </div>
                    </div>
                    <br/>
                    <Link to='/mentor-companies' className="waves-effect waves-light btn-large black adm-btn links">Companies</Link>
                    <Link to='/mentor-announcements' className="waves-effect waves-light btn-large black adm-btn links">Announcements</Link>
                    <br/><br/>
                </div>        
            </div>

            <div className="container">
                <div class="row">
                    <div class="col s12 m4">
                        <div class="card">
                            <div class="card-image">
                                <img src="assets/images/mentorbg.png" alt="Admin"/>
                                <span class="card-title" style={{marginBottom:"42.1%"}}>A mentor is someone who allows to see the hope inside yourself.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    )
}


export default Mentor
