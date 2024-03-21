// App.js
import Posts from "../component/Posts";
import BeApp from "../helpers/api_call/BeApp";
import React, { useState, useEffect } from 'react';

const Home = () => {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        BeApp.getBlogs().then((data) => {
            setBlog(data.data.data)
        })
      }, []);
    return (
        <>
            {blog.map((item,i)=>{
               return <Posts postData={item} key={i}  /> 
            })}
        </>
    );
};
 
export default Home;