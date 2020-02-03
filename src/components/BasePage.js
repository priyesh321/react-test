import React, { Component } from 'react';
import Footer from './Footer/Footer'

import { Link } from "react-router-dom";

class BasePage extends Component {
  render() {
    return (
      <div style={{alignItems:'center'}}>
        
       <Link style={{color:'#fff'}} to={"/sign-in"}>Click here to Login</Link>
      <Footer/>
      </div>
    );
  }
}

export default BasePage;