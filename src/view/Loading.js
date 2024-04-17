// App.js
import React from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { Container } from 'react-bootstrap';
import { lazy } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Loading = () => {
    
    return (
        <div className="d-flex flex-column min-vh-100"> 
            <div className="main-container" style={{backgroundColor: "aliceblue"}}>
                <BlogNav/>
                <Container>
                    <h1>Loading...</h1>
                </Container>
            </div>
            <Footer/>
        </div>
    );
};
 
export default Loading;