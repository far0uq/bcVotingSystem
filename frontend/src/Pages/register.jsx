import React from 'react';
import Logo from '../assets/logo/crystalvote_icon.png';
import './auth.css'
import { Link, useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)'
    ),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    address: Yup.string().required('Address is required'),
});

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      address: '', 
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8000/auth/register', values);
        console.log('Registration successful:', response.data);

        // Check if the registered user is an admin
        const isAdmin = response.data.isAdmin;
        if (isAdmin) {
          navigate('/admin-panel');
        } else {
          toast.success('Registration successful. Please sign in.');
          navigate('/signin');
        }
      } catch (error) {
        console.error('Registration failed:', error.response.data.error);
        toast.error('Registration failed. Please try again.');
      }
    },
  });

  return (
    <>
    <ToastContainer/>
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
            <div className="inputs">
              <input
                type="password"
                placeholder="Re-enter Password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className="inputs">
             <input
           type="text"
           placeholder="Address"
          name="address"
           onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
  />
  {formik.touched.address && formik.errors.address ? (
    <div className="error">{formik.errors.address}</div>
  ) : null}
</div>

            <div className="btn">
              <input type="submit" value="Sign up" />
            </div>
          </form>
        </div>
        <div className="txt">
          Already have an account?
          <Link to="/signin">
            <span>&nbsp;Sign in</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
