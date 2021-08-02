import React,{useState,useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom'
import Footer from '../footer';
import M from 'materialize-css';
import NavBar from '../Navbar';

const AdminCreatePost = () =>{
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

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
        fetch("/createtask",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{
                M.toast({html: "Announcement created successfully"})
                history.push('/admin-posts')
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <NavBar/>
            <div className="jumbotron" style={{minHeight:"550px"}}>
                <div className="container">
                    <div className="row row-header">
                        <div className="col-md-8">
                            <br/>
                            <h1 style={{marginBottom:"15px"}}>Create Announcement!</h1>
                            <br/>
                        </div>  
                        <div style={{marginLeft:"auto", marginRight:"1.4%", marginTop:"3%"}}>
                            <Link to='/admin-posts' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>          
                    </div>
                    <div className="card input-field col-md-8" style={{padding:"1% 3%", marginLeft:"16%", marginTop:"4%"}}><br/>
                            <input type="text" placeholder="title" style={{fontSize:"25px"}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            <input type="text" placeholder="body" style={{fontSize:"20px"}} value={body} onChange={(e)=>setBody(e.target.value)}/>
                            
                            <br/>
                            <button className="waves-effect waves-light btn black adm-btn links col-md-4" 
                                style={{marginLeft:"34%", color:"white"}}
                                onClick={()=>PostData()}>
                                Submit
                            </button><br/>
                    </div>
                </div>    
            </div>

            
            <Footer/>
        </div>
    )
}

export default AdminCreatePost
