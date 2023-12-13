import React from 'react';
import Logo from '../assets/logo/crystalvote_icon.png';
import './auth.css'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignInSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
    ),
});

  export default function SignIn() {
    const formik = useFormik({
      initialValues: {
        username: '',
        password: '',
      },
      validationSchema: SignInSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post('http://localhost:3001/auth/login', values);
          console.log('Login successful:', response.data);
        } catch (error) {
          console.error('Login failed:', error.response.data.error);
        }
      },
    });

  return (
    <>
      <div className="rect"></div>
      <div className="main">
        <div className="container">
          <div className="image">
            <img src={Logo} alt="error" />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="inputs">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="btn">
              <input type="submit" value="Sign in" />
            </div>
          </form>
        </div>
        <div className="txt">
          Don't have an account?
          <Link to="/register">
            <span>&nbsp;Register</span>
          </Link>
        </div>
      </div>
    </>
  )
}

