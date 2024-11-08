import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import Link from '@mui/material/Link';
import {config} from '../config'

const GOOGLE_LOGIN_API = config.authApiUrl + "/login/google"
const XGoogleLogin = () => {
  const navigate = useNavigate()

  const [accessToken, setAccessToken] = useState("");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setAccessToken(codeResponse.access_token)
    },
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
    () => {
        if (accessToken) {
          axios.post(GOOGLE_LOGIN_API, {
            accessToken
          })
          .then((res) => {
            window.localStorage.setItem('user', res.data.user);
            window.localStorage.setItem('token', res.data.token);
            window.localStorage.setItem('google', "true");
            navigate("/home");
          })
          .catch((err) => {
            console.log(err);
            window.alert(err.response.data.error);
          });
        }
    },
    [ accessToken ]
);

  return (
    <Link component="button" variant="body2" onClick={() => login()}>Google Sign-in</Link>
  )
}

export default XGoogleLogin