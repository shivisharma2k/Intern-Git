import React, {useEffect, createContext, useReducer, useContext} from 'react';
import "./App.css"
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import {reducer, initialState} from './reducers/userReducer'

import Home from './components/screens/home';
import ProfileAdmin from './components/ProfileAdmin';
import ProfileStudent from './components/ProfileStudent';
import ProfileMentor from './components/ProfileMentor';
import StudentLogin from './components/screens/student-login';
import MentorLogin from './components/screens/mentor-login';
import AdminLogin from './components/screens/admin-login';
import StudentSignup from './components/screens/student-signup';
import MentorSignup from './components/screens/mentor-signup';

import AdminReset from './components/screens/admin-reset';
import MentorReset from './components/screens/mentor-reset';
import StudentReset from './components/screens/student-reset';
import AdminNewPassword from './components/screens/adminNewPassword';
import MentorNewPassword from './components/screens/mentorNewPassword';
import StudentNewPassword from './components/screens/studentNewPassword';

import Admin from './components/screens/admin';
import AdminStudents from './components/admin/adminStudents';
import AdminStudentSearch from './components/admin/adminStudentSearch';
import AdminViewRequests from './components/admin/adminViewRequests';
import AdminMentors from './components/admin/adminMentors';
import AdminViewMentors from './components/admin/adminViewMentors';
import AdminPosts from './components/admin/adminPosts';
import AdminViewPosts from './components/admin/adminViewPosts';
import AdminCreatePost from './components/admin/adminCreatePost';
import AdminStudentUploads from './components/admin/adminStudentUploads';
import AdminCompanies from './components/admin/adminCompanies';
import AdminAddCompany from './components/admin/adminAddCompany';
import AdminViewCompanies from './components/admin/adminViewCompanies';
import AdminSearchbyname from './components/admin/adminSearchbyname';
import AdminSearchbyid from './components/admin/adminSearchbyid';
import AdminSearchbymentor from './components/admin/adminSearchbymentor';
import AdminSearchbyyear from './components/admin/adminSearchbyyear';
import AdminSearchbycourse from './components/admin/adminSearchbycourse';
import AdminSearchbybranch from './components/admin/adminSearchbybranch';

import Student from './components/screens/student';
import StudentAnnouncements from './components/student/studentAnnouncements';
import StudentUploadPost from './components/student/studentUploadPost';
import StudentCompanies from './components/student/studentCompanies';
import StudentUploads from './components/student/studentUploads';

import Mentor from './components/screens/mentor';
import MentorAnnouncements from './components/mentor/mentorAnnouncements';
import MentorCompanies from './components/mentor/mentorCompanies';

export const UserContext = createContext()

const Routing = () =>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      if(user.type=="admin"){
        dispatch({type:"USER",payload:user})
      }
      if(user.type=="student"){
        dispatch({type:"USER",payload:user})
      }
      if(user.type=="mentor"){
        dispatch({type:"USER",payload:user})
      }
    }
    else{
      if(!history.location.pathname.startsWith('/adminreset') && !history.location.pathname.startsWith('/studentreset') && !history.location.pathname.startsWith('/mentorreset'))
        history.push('/')
    }    
  }, [])

  return(
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/profile-admin"><ProfileAdmin/></Route>
      <Route exact path="/profile-student"><ProfileStudent/></Route>
      <Route exact path="/profile-mentor"><ProfileMentor/></Route>

      <Route path="/student-signin"><StudentLogin/></Route>
      <Route path="/mentor-signin"><MentorLogin/></Route>
      <Route path="/admin-signin"><AdminLogin/></Route>
      <Route path="/student-signup"><StudentSignup/></Route>
      <Route path="/mentor-signup"><MentorSignup/></Route>
      
      <Route exact path="/adminreset"><AdminReset/></Route>
      <Route exact path="/mentorreset"><MentorReset/></Route>
      <Route exact path="/studentreset"><StudentReset/></Route>
      <Route path="/adminreset/:token"><AdminNewPassword/></Route>
      <Route path="/mentorreset/:token"><MentorNewPassword/></Route>
      <Route path="/studentreset/:token"><StudentNewPassword/></Route>

      <Route path="/admin"><Admin/></Route>
      <Route path="/admin-students"><AdminStudents/></Route>
      <Route path="/admin-studentsearch"><AdminStudentSearch/></Route>
      <Route path="/admin-searchbyname"><AdminSearchbyname/></Route>
      <Route path="/admin-searchbyid"><AdminSearchbyid/></Route>
      <Route path="/admin-searchbymentor"><AdminSearchbymentor/></Route>
      <Route path="/admin-searchbyyear"><AdminSearchbyyear/></Route>
      <Route path="/admin-searchbycourse"><AdminSearchbycourse/></Route>
      <Route path="/admin-searchbybranch"><AdminSearchbybranch/></Route>
      <Route path="/admin-viewrequests"><AdminViewRequests/></Route>
      <Route path="/admin-studentuploads"><AdminStudentUploads/></Route>
      <Route path="/admin-mentors"><AdminMentors/></Route>
      <Route path="/admin-viewmentors"><AdminViewMentors/></Route>
      <Route path="/admin-posts"><AdminPosts/></Route>
      <Route path="/admin-viewposts"><AdminViewPosts/></Route>
      <Route path="/admin-createpost"><AdminCreatePost/></Route>
      <Route path="/admin-companies"><AdminCompanies/></Route>
      <Route path="/admin-viewcompanies"><AdminViewCompanies/></Route>
      <Route path="/admin-addcompany"><AdminAddCompany/></Route>

      <Route path="/admin-searchByName"><byName/></Route>
      <Route path="/admin-searchByMail"><byMail/></Route>
      <Route path="/admin-searchById"><byId/></Route>
      <Route path="/admin-searchByCourse"><byCourse/></Route>
      <Route path="/admin-searchByYear"><byYear/></Route>
      <Route path="/admin-searchByBranch"><byBranch/></Route>

      <Route path="/student"><Student/></Route>
      <Route path="/student-announcements"><StudentAnnouncements/></Route>
      <Route path="/student-uploadpost"><StudentUploadPost/></Route>
      <Route path="/student-companies"><StudentCompanies/></Route>
      <Route path="/student-myuploads"><StudentUploads/></Route>

      <Route path="/mentor"><Mentor/></Route>
      <Route path="/mentor-companies"><MentorCompanies/></Route>
      <Route path="/mentor-announcements"><MentorAnnouncements/></Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
