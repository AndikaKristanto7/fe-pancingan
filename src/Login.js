import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from './context/LoginContext';
import BeApp from './helpers/api_call/BeApp';
import { useNavigate } from 'react-router';

function Login() {
    const [ user, setUser ] = useState([]);
    const {isLogin, handleData,logoutLoginContext} = useContext(LoginContext)
    const navigate = useNavigate({})
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    
    useEffect(
        () => {
            if (typeof user.access_token !== "undefined") {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json',
                        }
                    })
                    .then((res) => {
                        postLogin(res.data)
                        
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

     const logOut = () => {
        googleLogout()
        logoutLoginContext()
        navigate('/')
    };

    async function postLogin(data) {
        let {name, email} = data
        let res = await BeApp.postLogin({
            name,
            email
        })
        handleData({...res.data.data,isLogin:true});
    }

    function showButton(){
        let button = <button onClick={login} className="btn">Sign in</button>
        if(isLogin){
            button = <button onClick={logOut} className="btn">Sign Out</button>
        }
        return button
    }
    return (
        <div>
                {showButton()}
        </div>
    )
};

export default Login