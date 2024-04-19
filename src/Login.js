import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoginContext } from './context/LoginContext';
import BeApp from './helpers/api_call/BeApp';

function Login() {
    const [ user, setUser ] = useState([]);
    const {isLogin, isAdmin, handleData} = useContext(LoginContext)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });
    useEffect(
        () => {
            if (user && typeof user.access_token != "undefined") {
                loginGoogle()
            }
        },
        [ user ]
    );

     const logOut = () => {
        googleLogout();
        handleData({});
    };

    async function postLogin(data) {
        let {name, email} = data
        let res = await BeApp.postLogin({
            name,
            email
        })
        return res.data.data
    }

    async function loginGoogle(){
        let resp = await axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
                Authorization: `Bearer ${user.access_token}`,
                Accept: 'application/json',
            }
        })
        let dataPostLogin = await postLogin(resp.data)
        await handleData({...resp.data,isLogin:true,role:dataPostLogin.role});
        return resp
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