// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { config } from '../config'
import { toast } from 'react-toastify'

const LOGIN_API = config.authApiUrl + "/login"
const LoginPage = () => {
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

    return (
        <div className='bg-gray-200 h-[100vh]'>
            <div className='flex flex-col justify-center items-center min-h-screen relative'>
                <Card className='flex flex-col sm:is-[450px] sm:m-10 md:m-0'>
                    <CardContent className='p-6 sm:!p-12'>
                        <Link to='/' className='flex justify-center items-center mbe-6'>
                            <img width={200} src="/src/assets/vfeed.png"></img>
                        </Link>
                        <div className='flex flex-col gap-5'>
                            <div>
                                <Typography className='flex justify-center items-center' variant='h4'>
                                    {`Threat Intelligence`}
                                </Typography>
                                <Typography className='mbs-1 pt-5'>Please sign-in to your account</Typography>
                            </div>
                            <form noValidate autoComplete='off' onSubmit={handleLogin} className='flex flex-col gap-5'>
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
                                    <Typography className='text-end' color='primary' component={Link} to='/forgot-password'>
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
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}

export default LoginPage
