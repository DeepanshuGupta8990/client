import { useState } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {config} from '../config';
import './UserRegistrationPage.css';

const REGISTER_API = config.authApiUrl + "/register"

function UserRegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [signup, setSignup] = useState(false);
  const [error, setError] = useState('');

  const resetFields = () => {
    setEmail('');
    setPassword('');
    setFName('');
    setLName('');
  }

  const registerUser = (e: any) => {
    e.preventDefault();

    // Clear signup and error message before submitting the request
    setError('');
    setSignup(false);

    axios
          .post(REGISTER_API, {
            email,
            password,
            firstname: fname,
            lastname: lname
          })
          .then(() => {
            resetFields();
            setSignup(true);
          })
          .catch((err) => {
            console.log(err);
            setError(err.response.data.error);
          });

  };

  return (
    <div className="login-signup-container">
      <form className="login-signup-form" onSubmit={registerUser}>
        <h2>New User Registration</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            required
          />
        </div>


        <div className='div-bottom-padding'>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </div>

        { signup ? 
            <div className='blue-text-padding'>User registered successfully.</div>  
            : null
          }

        { error ? 
            <div className='red-text-padding'>{error}</div>  
            : null
          }
          <Link to={`/`}>Go to Login Page</Link>
      </form>
    </div>
  );
}

export default UserRegistrationPage;