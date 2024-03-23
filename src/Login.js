import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

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
                <button onClick={login}>Sign in with Google</button>
        </div>
    )
};

export default Login