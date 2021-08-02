import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminAddIntern = () =>{
    const history = useHistory()
    const [company,setCompany] = useState("")
    const [student,setStudent] = useState("")

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

    const PostData = () =>{
        fetch("/addintern",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                company,
                student
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html:data.message})
                history.push('/admin-addintern')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <NavBar/>
            <div className="mycard">
                <div className="card auth-card input-field" style={{margin:"100px auto", padding:"2.3%"}}>
                    <br/><h3>Add an Intern</h3><br/>
                    <input type="text" placeholder="Company" value={company} onChange={(e)=>setCompany(e.target.value)}></input>
                    <input type="text" placeholder="Student" value={student} onChange={(e)=>setStudent(e.target.value)}></input>
                    <br/>
                    <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                        Add
                    </button>
                    <br/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default AdminAddIntern
