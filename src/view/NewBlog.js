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
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)

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
        let currentDescription = descRef.current.state.editorState.getCurrentContent().getPlainText()
        setDescription(currentDescription)
        BeApp.postBlog({
            title,
            slug,
            description:currentDescription,
            image,
            location,
            email
        })
        .then((resp)=>{
            console.log(resp)
            setSuccess(true)
            setError(false)
            setTimeout(()=>{
                setSuccess(false)
                setError(false)
                navigate('/')
            },1500)
        })
        .catch((e)=>{
            setSuccess(false)
            setError(true)
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
                    <Form>
                        <Row className='mb-3 mt-3' style={{display: !isLogin ? '' : "none"}}>
                            <Alert show={true} id="alert-error" variant='danger' dismissible>
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
                            <CustomEditor ref={descRef} value={description} initialText=""/>
                        </Form.Group>
                        <Form.Group className="mb-3" style={{display: isLogin ? '' : "none"}}>
                            <Form.Label>Picture:</Form.Label>
                            <Form.Group>
                                <Uploader ref={imgRef} onSetImageChange={setImage}/>
                            </Form.Group>
                        </Form.Group>
                        <Row>
                            <Col md={12}>Location:</Col>
                            
                            <Col md={6}>
                                <Map ref={mapRef} mapData={{lat:0,lang:0}} onDataChange={handleMapChange} />
                            </Col>
                        </Row>
                        <Alert show={isSuccess} id="alert-success" variant='primary' >
                            Create new blog success!
                        </Alert>
                        <Alert show={isError} id="alert-error" variant='danger' dismissible>
                            Create new blog error!
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