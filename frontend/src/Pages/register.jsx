import React from 'react'
import Logo from '../assets/logo/crystalvote_icon.png';
import './auth.css'
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <>
 <div className="rect"></div>
    <div className="main">
      <div className="container">
      <div className="image">
        <img src={Logo} alt="error"/>
      </div>
      <div className="inputs">
        <input type="text" placeholder='Username' />
      </div>
      <div className="inputs">
        <input type="text" placeholder='Password' />
      </div>
      <div className="inputs">
        <input type="text" placeholder='Re-enter Password' />
      </div>
      </div>
      <div className="btn">
        <input type="button" value="Sign up" />
      </div>
      <div className="txt">
      Already have an account?<Link to="/signin"><span>&nbsp;Sign in</span></Link>
      </div>
      </div>
    </>
  )
}

