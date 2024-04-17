import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from './context/LoginContext';

function Login() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);
    const {email, name, id, handleData} = useContext(LoginContext)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json',
                        }
                    })
                    .then((res) => {
                        console.log(res.data);
                        setProfile(res.data);
                        handleData(res.data);
                        console.log(email, name, id)
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

     const logOut = () => {
        googleLogout();
        setProfile(null);
        
    };
    return (
        <div>
                <button onClick={login} className="btn">Sign in</button>
                <button onClick={logOut} className="btn">Sign Out</button>
        </div>
    )
};

export default Login