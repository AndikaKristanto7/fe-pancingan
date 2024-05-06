// App.js
import React, { useContext, useRef, useState } from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { lazy } from 'react';
import {CustomEditor} from "../component/CustomEditor"
import Uploader from "../component/Uploader"
import slugify from 'react-slugify';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BeApp from '../helpers/api_call/BeApp'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginContext.js';
const Map = lazy(() => import('../component/Map.js'));


const NewBlog = () => {
    const navigate = useNavigate();
    const {isLogin, email } = useContext(LoginContext)
    const [title,setTitle] = useState('')
    const [slug,setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [image,setImage] = useState({})
    const [location,setLocation] = useState({})
    const [isError, setError] = useState({
        title: false,
        description: false,
        image: false,
        location: false,
        afterSubmit : false,
    });
    const [isSuccess, setSuccess] = useState(false)

    const descRef = useRef()
    const imgRef = useRef()
    const mapRef = useRef()

    const validateImageState = (image) => {
        return image && Object.keys(image).length === 0 && image.constructor === Object
    }
    
    const validateLocationState = (location) => {
        var isError = false
        for (const [key, value] of Object.entries(location)) {
            if (value == "0" || isNaN(value)) {
                isError=true
            }
        }
        return isError
    }
    
    function handleInputTitle(e) {
       setTitle(e.target.value)
       setSlug(slugify(e.target.value))
    }

    function handleSubmit(e){
        e.preventDefault()
        e.stopPropagation()

        let currentDescription = descRef.current.state.editorState.getCurrentContent().getPlainText()
        setDescription(currentDescription)

        const newError = {
            title: !title,
            description: !currentDescription,
            image: validateImageState(image),
            location: validateLocationState(location),
            afterSubmit : false
        };

        setError(newError);

        if (Object.values(newError).some(error => error)) {
            setSuccess(false);
            return;
        }
        
        BeApp.postBlog({
            title,
            slug,
            description:currentDescription,
            image,
            location,
            email
        })
        .then((resp)=>{
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
                setError({
                    title: false,
                    description: false,
                    image: false,
                    location: false,
                    afterSubmit : false
                });
                navigate(`/blog/${slug}`)
            },1500)
        })
        .catch((e)=>{
            setSuccess(false)
            setError({
                title: false,
                description: false,
                image: false,
                location: false,
                afterSubmit : true
            })
            console.log(e)
        })
        
    }

    function handleMapChange(e){
        setLocation(e)
    }

    return (
        <>
        
        <div className="d-flex flex-column min-vh-100"> 
            <div className="main-container" style={{backgroundColor: "aliceblue"}}>
                <BlogNav/>
                
                <Container>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Row className='mb-3 mt-3' style={{display: !isLogin ? '' : "none"}}>
                            <Alert show={true} id="alert-error" variant='danger'>
                                Login terlebih dahulu!
                            </Alert>
                        </Row>
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
                            <CustomEditor type="text" ref={descRef} value={description} initialText=""/>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{display: isLogin ? '' : "none"}}>
                            <Form.Label>Picture:</Form.Label>
                            <Form.Group>
                                {Object.keys(image).length !== 0 && <Image src={image}></Image> }
                                <Uploader onSetImageChange={setImage}/>
                            </Form.Group>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row>
                                <Col md={12}>Location:</Col>
                                <Col md={12}>
                                    <Map ref={mapRef} mapData={{lat:0,lang:0}} onDataChange={handleMapChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Alert show={isSuccess} id="alert-success" variant='primary' >
                            Create new blog success!
                        </Alert>
                        <Alert show={isError.afterSubmit} id="alert-error" variant='danger'>
                            Create new blog error!
                        </Alert>
                        <Alert show={isError.title} id="alert-error" variant='danger'>
                            Create new blog error!, Title not filled
                        </Alert>
                        <Alert show={isError.description} id="alert-error" variant='danger'>
                            Create new blog error!, Description not filled
                        </Alert>
                        <Alert show={isError.image} id="alert-error" variant='danger'>
                            Create new blog error!, Image not filled
                        </Alert>
                        <Alert show={isError.location} id="alert-error" variant='danger'>
                            Create new blog error!, Location not filled
                        </Alert>
                        <Row className='mb-3 mt-3' style={{display: isLogin ? '' : "none"}}>
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
        </>
        
    );
};
 
export default NewBlog;