import React, {createContext, useEffect, useState} from "react";
import { useCookies } from 'react-cookie'
import BeApp from "../helpers/api_call/BeApp";

export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [cookies, setCookie,removeCookie] = useCookies(['user'])

    const [data, setData] = useState({
        email:'',
        name:'',
        id:'',
        isLogin : false,
        token : '',
        role : '',
    })

    useEffect(()=>{
        if(cookies.user && Object.keys(cookies.user).length !== 0){
            handleData(cookies.user)
            setInterval(()=>{
                BeApp.refreshToken({email:cookies.user.email})
                .then((resp)=>{
                    cookies.user.token = resp.data.token
                    handleData(cookies.user,resp.data.token)
                }).catch((e)=>{
                    console.log(e)
                })
            },30 * 1000 * 60)
        }else{
            logoutLoginContext()
        }
    },[])


    async function handleData(param,token = '') {
        
        var obj = {}
        obj = {
            email: '',
            name : '',
            id: '',
            isLogin : false,
            token : '',
            role : '',
        }
            
        if(typeof param === "object"){
            obj = {
                email: param.email,
                name : param.name,
                id: param.id,
                isLogin : param.isLogin ?? false,
                token : token !== '' ? token :  param.token,
                role : param.role
            }   
        }
        if(token !== ''){
            removeCookie('user',{path:'/'});
        }
        setData(obj)
        let expires = new Date()
        expires.setTime(expires.getTime() + (30 * 1000 * 60))
        setCookie('user',obj, {path : '/',expires})
        console.log(cookies.user)
    }

    function isSameUser(email){
        return data.email === email
    }

    function isAdmin(){
        return data.role === "admin"
    }

    function logoutLoginContext(){
        var obj = {}
        obj = {
            email: '',
            name : '',
            id: '',
            isLogin : false,
            token : '',
            role : '',
        }
        setData(obj)
        removeCookie('user',{path:'/'});
    }

    return (
        <LoginContext.Provider value={{...data, handleData,isSameUser,isAdmin,logoutLoginContext}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider