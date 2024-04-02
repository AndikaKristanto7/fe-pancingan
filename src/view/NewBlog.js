// App.js
import React, { useRef, useState } from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { lazy } from 'react';
import {CustomEditor} from "../component/CustomEditor"
import Uploader from "../component/Uploader"
import slugify from 'react-slugify';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const Map = lazy(() => import('../component/Map.js'));


const NewBlog = () => {
    const [title,setTitle] = useState('')
    const [slug,setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [image,setImage] = useState({})
    const [location,setLocation] = useState({})

    const descRef = useRef()
    const imgRef = useRef()
    const mapRef = useRef()

    function handleInputTitle(e) {
       setTitle(e.target.value)
       setSlug(slugify(e.target.value))
    }

    function handleSubmit(e){
        e.preventDefault()
        e.stopPropagation()
        setDescription(descRef.current.state.editorState.getCurrentContent().getPlainText())
        console.log(location)
    }

    function handleMapChange(e){
        setLocation(e)
        console.log(location)
    }

    return (
        <div className="d-flex flex-column min-vh-100"> 
            <div className="main-container" style={{backgroundColor: "aliceblue"}}>
                <BlogNav/>
                
                <Container>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title Blog:</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => handleInputTitle(e)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Slug Blog:</Form.Label>
                            <Form.Control type="email" placeholder="" readOnly value={slug}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <CustomEditor ref={descRef} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture:</Form.Label>
                            <Form.Group>
                                <Uploader ref={imgRef}/>
                            </Form.Group>
                        </Form.Group>
                        <Row>
                            <Col md={12}>Location:</Col>
                            
                            <Col md={6}>
                                <Map ref={mapRef} mapData={{lat:0,lang:0}} onDataChange={handleMapChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={1}>
                                <Button variant="primary" type="submit" className='mt-4' onClick={(e) => handleSubmit(e)}>
                                    Submit
                                </Button>
                            </Col>    
                            <Col md={1}>
                                <Button variant="danger" type="submit" className='mt-4'>
                                    Cancel
                                </Button>
                            </Col>    
                        </Row>
                    </Form>                    
                </Container>
            </div>
            <Footer/>
        </div>
    );
};
 
export default NewBlog;