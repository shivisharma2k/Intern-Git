import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory,Link} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const AdminAddCompany = () =>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [about,setAbout] = useState("")

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
        fetch("/createcompany",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                about
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html:data.message})
                history.push('/admin-companies')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <NavBar/>
            <div>
                <div className="row">
                <div style={{marginLeft:"0", marginTop:"10px"}}>
                        <Link to='/admin-companies' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                        </Link>
                    </div>
            <div className="mycard">
                <div className="card auth-card input-field col-lg-4" style={{margin:"105px 0 100px 450px"}}>
                    <br/><h3>Add a company</h3><br/>
                    <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                    <input type="text" placeholder="About" value={about} onChange={(e)=>setAbout(e.target.value)}></input>
                    <br/>
                    <button className="btn waves-effect waves-light black login-btn" onClick={()=>PostData()}>
                        Add
                    </button>
                    <br/>
                </div>
            </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default AdminAddCompany
