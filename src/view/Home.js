// App.js
import Posts from "../component/Posts";
import BeApp from "../helpers/api_call/BeApp";
import React, { useEffect, useContext } from 'react';
import { PostContext } from "../context/postContext";
const Home = () => {
    const {handleData} = useContext(PostContext)
    useEffect(() => {
        BeApp.getBlogs().then((data) => {
            handleData(data.data.data)
        })
      }, []);
      
    return (
        <Posts/>
    );
};
 
export default Home;