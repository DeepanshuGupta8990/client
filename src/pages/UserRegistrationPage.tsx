import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../config";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const REGISTER_API = config.authApiUrl + "/register";

function UserRegistrationPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [signup, setSignup] = useState(false);
    const [error, setError] = useState("");

    const resetFields = () => {
        setEmail("");
        setPassword("");
        setFName("");
        setLName("");
    };

    const registerUser = (e: any) => {
        e.preventDefault();

        toast.loading("Registering...");

        // Clear signup and error message before submitting the request
        setError("");
        setSignup(false);

        axios
            .post(REGISTER_API, {
                email,
                password,
                firstname: fname,
                lastname: lname,
            })
            .then(() => {
                resetFields();
                setSignup(true);
                toast.dismiss();
                toast.success("Registration successful!");
                navigate("/login"); // Redirect to login page after successful registration
            })
            .catch((err) => {
                toast.dismiss();
                console.log(err);
                setError(
                    err.response?.data?.error ||
                    "Something went wrong, please try again later."
                );
            });
    };

    return (
        <div className="bg-gray-200 h-[100vh]">
            <div className="flex flex-col justify-center items-center min-h-screen relative">
                <Card className="flex flex-col sm:w-[450px] sm:m-10 md:m-0">
                    <CardContent className="p-6 sm:!p-12">
                        <div className="flex flex-col gap-5">
                            <div className="flex justify-center items-center flex-col">
                                <img width={200} src="/src/assets/vfeed.png"></img>
                                <Typography className='flex justify-center items-center' variant='h4'>
                                    {`Threat Intelligence`}
                                </Typography>
                                <Typography variant="h6" className='pt-5'>{`Create a New Account`}</Typography>
                            </div>
                            <form
                                noValidate
                                autoComplete="off"
                                onSubmit={registerUser}
                                className="flex flex-col gap-5"
                            >
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    type="text"
                                    value={fname}
                                    onChange={(e) => setFName(e.target.value)}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    type="text"
                                    value={lname}
                                    onChange={(e) => setLName(e.target.value)}
                                    required
                                />
                                <TextField
                                    autoFocus
                                    type="email"
                                    fullWidth
                                    label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <Button fullWidth variant="contained" type="submit">
                                    Sign Up
                                </Button>

                                {signup && (
                                    <Typography color="primary" className="text-center mt-2">
                                        User registered successfully.
                                    </Typography>
                                )}

                                {error && (
                                    <Typography color="error" className="text-center mt-2">
                                        {error}
                                    </Typography>
                                )}

                                <Divider className="mt-4">or</Divider>

                                <div className="flex justify-center items-center gap-2 mt-4">
                                    <Typography>Already have an account?</Typography>
                                    <Typography component={Link} to="/login" color="primary">
                                        Login here
                                    </Typography>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default UserRegistrationPage;
