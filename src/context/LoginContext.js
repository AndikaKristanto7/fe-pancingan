import React, {createContext, useContext, useState} from "react";
export const LoginContext = createContext()

const LoginContextProvider = (props) => {
    const [data, setData] = useState({
        email:'',
        name:'',
        id:''
    })
    function handleData(data) {
        setData((prevState) => ({
            ...prevState,
            email: data.email,
            name : data.name,
            id: data.id
        }))        
    }

    return (
        <LoginContext.Provider value={{...data, handleData}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider