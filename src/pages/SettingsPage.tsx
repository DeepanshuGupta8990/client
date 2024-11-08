import { useState, useEffect } from 'react'
import axios from 'axios';

import { handleLogout } from '../helpers/utils';
import {config} from '../config'

const ME_API = config.authApiUrl + "/user/me"
const GUEST_EMAIL = import.meta.env.VITE_GUEST_EMAIL || "guest@guest.com";

const SettingsPage = () => {
  const user = window.localStorage.getItem('user') || '';
  const token = window.localStorage.getItem('token');
  const google = window.localStorage.getItem('google');

  const [email, setEmail] = useState(user);
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState('');

  
  
  useEffect(() => {
    axios.get(ME_API, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const user = res.data.data;
      setEmail(user.email);
      setFName(user.firstname);
      setLName(user.lastname);
    }).catch((err) => {
      console.log(err)
      if(err.status == 401) {
        handleLogout();
      }
    });
  },[]);

  const updateUser = (e: any) => {
    e.preventDefault();

    // Clear success and error message before submitting the request
    setError('');
    setUpdate(false);

    axios.put(ME_API, {
        firstname: fname,
        lastname: lname
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        setUpdate(true);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
      });
  };

  return (
    <div>
      <h2>Settings</h2>
      <section className="widget">
        <div className="settings-container">
          <form className="login-signup-form" onSubmit={updateUser}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                disabled
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
                disabled={email == GUEST_EMAIL || google === "true"}
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
                disabled={email == GUEST_EMAIL || google === "true"}
              />
            </div>

            { (email !== GUEST_EMAIL && google !== "true") ? 
              <div className='div-bottom-padding'>
                <button type="submit" className="signup-button">
                  Update
                </button>
              </div>
              : null
            }
            { update ? 
              <div className='blue-text-padding'>User updated successfully.</div>  
              : null
            }
            { error ? 
              <div className='red-text-padding'>{error}</div>  
              : null
            }
          </form>
        </div>
      </section>
    </div>
  )
}

export default SettingsPage