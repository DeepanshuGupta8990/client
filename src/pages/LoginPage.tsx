// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {config} from '../config'
import { toast } from 'react-toastify'

const LOGIN_API = config.authApiUrl + "/login"
const GUEST_PASSWORD = import.meta.env.VITE_GUEST_PASSWORD || "easy";
const GUEST_EMAIL = import.meta.env.VITE_GUEST_EMAIL || "guest@guest.com";
const LoginPage = ( ) => {
  const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleLogin = (e: any) => {
    e?.preventDefault();
  
    toast.loading("Logging in...");
  
    // Check for email and password values before making the request
    if (!email || !password) {
      toast.dismiss();
      toast.error("Please enter both email and password.");
      return;
    }
  
    axios
      .post(LOGIN_API, { email, password })
      .then((res) => {
        if (res?.data?.token) {
          // Handle success: Store user data and token in localStorage
          console.log("Login successful, token received:", res.data.token);
          window.localStorage.setItem('user', email);
          window.localStorage.setItem('token', res.data.token);
  
          toast.dismiss();
          toast.success("Login successful!");
          navigate("/home");  // Redirect to home page
        } else {
          toast.dismiss();
          toast.error("Unexpected response from server.");
        }
      })
      .catch((err) => {
        toast.dismiss();
        
        // Handle different error types based on status code
        if (err?.response) {
          const errorMessage = err.response?.data?.error || "Something went wrong, please try again later.";
          toast.error(errorMessage);
          setError(errorMessage);  // Optionally display the error message in your UI
        } else if (err?.request) {
          // No response was received (e.g., network error)
          toast.error("Network error. Please check your connection.");
        } else {
          // Other errors (e.g., request setup errors)
          toast.error("Error occurred while logging in.");
        }
        console.error("Login error:", err);
      });
  };
  
  const loginAsGuest = async () => {
    toast.loading("Logging in as Guest...");
  
    axios
      .post(LOGIN_API, {
        email: GUEST_EMAIL,
        password: GUEST_PASSWORD,
      })
      .then((res) => {
        if (res?.data?.token) {
          console.log("Guest login successful, token received:", res.data.token);
          window.localStorage.setItem('user', GUEST_EMAIL);
          window.localStorage.setItem('token', res.data.token);
  
          toast.dismiss();
          toast.success("Logged in as Guest!");
          navigate("/home");
        } else {
          toast.dismiss();
          toast.error("Unexpected response from server.");
        }
      })
      .catch((err) => {
        toast.dismiss();
        
        // Handle different error types based on status code
        if (err?.response) {
          const errorMessage = err.response?.data?.error || "Something went wrong, please try again later.";
          toast.error(errorMessage);
          setError(errorMessage);  // Optionally display the error message in your UI
        } else if (err?.request) {
          // No response was received (e.g., network error)
          toast.error("Network error. Please check your connection.");
        } else {
          // Other errors (e.g., request setup errors)
          toast.error("Error occurred while logging in.");
        }
        console.error("Guest login error:", err);
      });
  };

  return (
    <div className='bg-gray-200 h-[100vh]'>
    <div className='flex flex-col justify-center items-center min-h-screen relative'>
      <Card className='flex flex-col sm:is-[450px] sm:m-10 md:m-0'>
        <CardContent className='p-6 sm:!p-12'>
          <Link to='/' className='flex justify-center items-center mbe-6'>
            {/* <Logo /> */}
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to !👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign-in to your account</Typography>
            </div>
            <form noValidate autoComplete='off'onSubmit={handleLogin}  className='flex flex-col gap-5'>
              <TextField 
              autoFocus 
              type='email'
              fullWidth 
              label='Email'
              value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
               <TextField  
              fullWidth 
              label='Password'
              type='password'
              value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
              
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>

              
              {error && <Typography color="error" className="mb-4">{error}</Typography>}

              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} to='/register' color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3'>or</Divider>
              <Button fullWidth variant='outlined' type='button' onClick={() => loginAsGuest()} >
              Guest Login
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>

    </div>
  )
}

export default LoginPage
