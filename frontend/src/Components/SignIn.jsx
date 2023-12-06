import React from 'react';
import Logo from '../assets/logo/crystalvote_icon.png';
import './Auth.css'
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <>
    <div className="main">
    <div className="image">
        <img src={Logo} alt="error"/>
      </div>
      <div className="container">
      <div className="inputs">
        <input type="text" placeholder='Username' />
      </div>
      <div className="inputs">
        <input type="text" placeholder='Password' />
      </div>
      </div>
      <div className="btn">
        <input type="button" value="Sign in" />
      </div>
      <div className="txt">
        Dont have an account?<Link to="/register">Register</Link>
      </div>
    </div>
     
    </>
  )
}

