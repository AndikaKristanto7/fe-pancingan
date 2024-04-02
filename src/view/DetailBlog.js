// App.js
import React from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { useLoaderData } from 'react-router';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { lazy } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Map = lazy(() => import('../component/Map.js'));

const DetailBlog = () => {
    const { data } = useLoaderData();
    
    return (
        <div className="d-flex flex-column min-vh-100"> 
            <div className="main-container" style={{backgroundColor: "aliceblue"}}>
                <BlogNav/>
                <Container>
                    <Row className=''>
                        <Col md={{ span: 6, offset: 4 }} center>
                            <h1>{data.data.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span:12}} className='text-center'>
                            <Image className="center-block" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230305183140/Javascript.jpg" fluid/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='text-justify'>
                            <p dangerouslySetInnerHTML={{__html:data.data.description}}></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>Lokasi</Col>
                        
                        <Col md={6}>
                            <Map mapData={JSON.parse(data.data.location)} onDataChange={((e)=> true)} autocompleteMap={false}></Map>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
            <Footer/>
        </div>
    );
};
 
export default DetailBlog;