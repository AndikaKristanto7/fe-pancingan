import React, {createContext, useEffect, useState} from "react";
import { useCookies } from 'react-cookie'

export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [cookies, setCookie] = useCookies(['user'])

    const [data, setData] = useState({
        email:'',
        name:'',
        id:'',
        isLogin : false,
        token : '',
        role : '',
    })

    useEffect(()=>{
        if(cookies.user && Object.keys(cookies.user).length !== 0 && !data.isLogin){
            handleData(cookies.user)
        }
    },[])


    async function handleData(param) {
        
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
                token : param.token,
                role : param.role
            }   
        }
        setData(obj)
        let expires = new Date()
        expires.setTime(expires.getTime() + (30 * 1000 * 60))
        setCookie('user',obj, {path : '/',expires})
        console.log(cookies)
    }

    function isSameUser(email){
        return data.email === email
    }

    function isAdmin(){
        return data.role === "admin"
    }

    return (
        <LoginContext.Provider value={{...data, handleData,isSameUser,isAdmin}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider