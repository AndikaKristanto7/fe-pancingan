// App.js
import Posts from "../component/Posts";
import BeApp from "../helpers/api_call/BeApp";
import React, { useEffect, useContext, useState } from 'react';
import { PostContext } from "../context/postContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLoaderData } from "react-router";
const Home = () => {
    const { data } = useLoaderData();
    const {handleData,getData} = useContext(PostContext)
    const [page,setPage] = useState(2)
    let dataContext = getData()
    
    useEffect(() => {
        handleData(data.data)
    }, []);

    function fetchMoreData() {
        let oldData = dataContext
        setPage(page + 1)
        BeApp.getBlogs({page}).then((data) => {
            let newData = [...oldData,...data.data.data]
            handleData(newData)
        })
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