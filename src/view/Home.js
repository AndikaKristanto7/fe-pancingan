// App.js
import Posts from "../component/Posts";
import BeApp from "../helpers/api_call/BeApp";
import React, { useEffect, useContext, useState } from 'react';
import { PostContext } from "../context/postContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLoaderData, useLocation } from "react-router";
import { LoginContext } from "../context/LoginContext";
const Home = () => {
    const { data } = useLoaderData();
    const {handleData,getData} = useContext(PostContext)
    const {isLogin,email} = useContext(LoginContext)
    const [page,setPage] = useState(2)
    let dataContext = getData()
    const location = useLocation();
    const { hash, pathname, search } = location;
    useEffect(() => {
        handleData(data.data)
    }, [data]);

    function fetchMoreData() {
        if(dataContext.length >= 10){
            let oldData = dataContext
            let addParam = {}
            setPage(page + 1)
            if(pathname.includes('unpublished')){
                addParam = {unpublished:true}
            }else if(pathname.includes('my-blog')){
                addParam = {email}
            }
            BeApp.getBlogs({page,...addParam}).then((data) => {
                let newData = [...oldData,...data.data.data]
                handleData(newData)
            })
        }
    }
      
      
    return (
        <InfiniteScroll
            dataLength={dataContext.length}
            next={fetchMoreData}
            hasMore={true}
        >
            <Posts/>
        </InfiniteScroll>
    );
};
 
export default Home;