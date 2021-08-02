import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {UserContext} from '../App'

const NavBar = () =>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const renderList = () =>{
      if(state){
        if(state.type=="admin"){
          return [
            <li>
              <Link to="/admin" className="links">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>,
            <li>
              <Link to="/profile-admin" className="links">
                <i className="fa fa-user"></i> Profile
              </Link>
            </li>,
            <li>
              <button className="btn waves-effect waves-light black login-btn" style={{marginLeft:"0"}}
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/')
                }}>
                Log Out
              </button>
            </li>
          ]
        }
        if(state.type=="student"){
          return [
            <li>
              <Link to="/student" className="links">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>,
            <li>
              <Link to="/profile-student" className="links">
                <i className="fa fa-user"></i> Profile
              </Link>
            </li>,
            <li>
              <button className="btn waves-effect waves-light black login-btn" style={{marginLeft:"0"}}
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/')
                }}>
                Log Out
              </button>
            </li>
          ]
        }
        if(state.type=="mentor"){
          return [
            <li>
              <Link to="/mentor" className="links">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>,
            <li>
              <Link to="/profile-mentor" className="links">
                <i className="fa fa-user"></i> Profile
              </Link>
            </li>,
            <li>
              <button className="btn waves-effect waves-light black login-btn" style={{marginLeft:"0"}}
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                  history.push('/')
                }}>
                Log Out
              </button>
            </li>
          ]
        }
      }
      else{
        return[
          <li><Link to="/student-signin" className="links">Student </Link></li>,
          <li><Link to="/mentor-signin" className="links">Mentor </Link></li>,
          <li><Link to="/admin-signin" className="links">Admin </Link></li>
        ]

      }
    }
    return(
        <nav>
          <div className="nav-wrapper green" style={{padding:"0% 2%"}}>
            <Link to={state?state.type=="admin"?"/admin":state.type=="student"?"/student":state.type=="mentor"?"/mentor":"/":"/"} 
              className="brand-logo left links"><b>IM</b></Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {renderList()}
            </ul>
          </div>
        </nav>
    )
}

export default NavBar