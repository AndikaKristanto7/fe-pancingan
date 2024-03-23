import { createContext, useState } from "react";
export const PostContext = createContext()
const PostContextProvider =  (props) => {
    const [data, setData] = useState([{
            title:'',
            image:'',
            description:'',
            slug:'',
        }
    ])
    const handleData = (post) => {
        setData(post)
    }
    
    const getData = () => {
        return data
    }
    return (
        <PostContext.Provider value={{...data, handleData,getData }}>
            {props.children}
        </PostContext.Provider>
    );
}
export default PostContextProvider