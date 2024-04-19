import React, {createContext, useState} from "react";
export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [data, setData] = useState({
        email:'',
        name:'',
        id:'',
        isLogin : false,
        isAdmin : false
    })
    async function handleData(param) {
        var obj = {}
        obj = {
            email: '',
            name : '',
            id: '',
            isLogin : false,
            isAdmin : false 
        }
            
        if(typeof param === "object"){
            obj = {
                email: param.email,
                name : param.name,
                id: param.id,
                isLogin : param.isLogin,
                isAdmin : param.role === "admin"
            }   
        }
        setData(obj)        
    }

    return (
        <LoginContext.Provider value={{...data, handleData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider