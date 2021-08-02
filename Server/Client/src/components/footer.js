import React from 'react';
import {Link} from 'react-router-dom'

const Footer = () =>{
    return(
      <nav>
        <div className="footer green" style={{padding:"0% 2%"}}>
          <div className="container">
            <div className="text-center">
              <Link className="socialbtn waves-effect waves-light btn-floating btn-medium">
                <i className="fa fa-google-plus"></i>                           
              </Link>
              <Link className="socialbtn waves-effect waves-light btn-floating btn-medium">
                <i className="fa fa-facebook"></i>                           
              </Link>
              <Link className="socialbtn waves-effect waves-light btn-floating btn-medium">
                <i className="fa fa-instagram"></i>                           
              </Link>
              <Link className="socialbtn waves-effect waves-light btn-floating btn-medium">
                <i className="fa fa-twitter"></i>                           
              </Link>
              <Link className="socialbtn waves-effect waves-light btn-floating btn-medium">
                <i className="fa fa-linkedin"></i>                           
              </Link>
              <div className="justify-content-center">
                <p>© Copyright 2021 Intern Manager - Shivi & Kunal</p>
              </div>    
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Footer