import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {Link,useHistory} from 'react-router-dom'
import Footer from '../footer';
import NavBar from '../Navbar';

const StudentUploadPost = () =>{
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [document, setDocument] = useState("")
    const [url, setUrl] = useState("")

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

    useEffect(()=>{
        if(url){
            fetch("/uploadpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    document:url
                })
            }).then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.error){
                    M.toast({html: data.error})
                }
                else{
                    M.toast({html:"Post uploaded successfully."})
                    history.push('/student-announcements')
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData()
        data.append("file",document)
        data.append("upload_preset","intern-manager")
        data.append("cloud_name","shivi09")
        fetch("https://api.cloudinary.com/v1_1/shivi09/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
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
                            <h1 style={{marginBottom:"15px"}}>Upload Post!</h1>
                            <br/>
                        </div> 
                        <div style={{marginLeft:"auto", marginRight:"1.4%", marginTop:"3%"}}>
                            <Link to='/student-announcements' className="links waves-effect waves-light btn-large pink col-md-12">
                            <i className="fa fa-arrow-left"/> Back
                            </Link>
                        </div>             
                    </div>
                    <div className="card input-field col-md-8" style={{padding:"2% 3%", marginLeft:"16%"}}><br/>
                            <input type="text" placeholder="title" style={{fontSize:"27px"}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            <div className="file-field input-field">
                                <div className="btn waves-effect waves-light black login-btn" style={{paddingBottom:"5%", fontSize:"20px", marginLeft:"0"}}>
                                    <span>Upload</span>
                                    <input type="file" onChange={(e)=>setDocument(e.target.files[0])}></input>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
                            <br/>
                            <button className="waves-effect waves-light btn black adm-btn links col-md-4" 
                                style={{marginLeft:"35%", color:"white"}}
                                onClick={()=>postDetails()}>
                                Submit
                            </button><br/>
                    </div>
                    <br/>
                </div>        
            </div>

            
            <Footer/>
        </div>
    )
}

export default StudentUploadPost
