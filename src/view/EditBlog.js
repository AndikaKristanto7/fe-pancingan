// App.js
import React, { useEffect, useRef, useState } from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { Alert, Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { lazy } from 'react';
import {CustomEditor} from "../component/CustomEditor"
import Uploader from "../component/Uploader"
import slugify from 'react-slugify';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BeApp from '../helpers/api_call/BeApp'
import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2';
const Map = lazy(() => import('../component/Map.js'));


const EditBlog = () => {
    const { data } = useLoaderData();
    const navigate = useNavigate()
    const [title,setTitle] = useState('')
    const [slug,setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [image,setImage] = useState({})
    const [location,setLocation] = useState({})
    const [isError, setError] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    const [swalProps, setSwalProps] = useState({});

    const descRef = useRef()
    const imgRef = useRef()
    const mapRef = useRef()

    useEffect(()=>{
        setTitle(data.data.title)
        setSlug(data.data.slug)
        setDescription(data.data.description)
        setLocation(data.data.location)
    },[data])

    function handleInputTitle(e) {
       setTitle(e.target.value)
       setSlug(slugify(e.target.value))
    }

    function handleSubmit(e){
        e.preventDefault()
        e.stopPropagation()
        let currentDescription = descRef.current.state.editorState.getCurrentContent().getPlainText()
        setDescription(currentDescription)
        console.log(data)
        
        BeApp.updateBlogBySlug(data.data.slug,{
            title,
            slug,
            description:currentDescription,
            image : "https://oneshaf.com/wp-content/uploads/2021/08/placeholder.png",
            location
        })
        .then(()=>{
            setSuccess(true)
            setError(false)
            setSuccessText('Create new blog success!')
            setTimeout(()=>{
                navigate('/')
            },1500)
        })
        .catch((e)=>{
            setSuccess(false)
            setError(true)
            setErrorText('Error create new blog!')
        })
        
    }

    function handleMapChange(e){
        setLocation(e)
    }

    function handleDelete(e){
        e.preventDefault()
        e.stopPropagation()
        setSwalProps({
            show: true,
            title: 'Example',
            text: 'Confirm delete this blog?',
            confirmButtonText: "Delete!",
            showCancelButton: true,
            denyButtonText: `Don't delete!`,
        });
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
                            <CustomEditor ref={descRef} initialText={data.data.description}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Picture:</Form.Label>
                            <Form.Group>
                                <Uploader value={image}/>
                            </Form.Group>
                        </Form.Group>
                        <Row>
                            <Col md={12}>Location:</Col>
                            
                            <Col md={6}>
                                <Map mapData={JSON.parse(data.data.location)} onDataChange={handleMapChange} />
                            </Col>
                        </Row>
                        <Alert show={isSuccess} id="alert-success" variant='primary' >
                            { successText }
                        </Alert>
                        <Alert show={isError} id="alert-error" variant='danger' dismissible>
                            { errorText }
                        </Alert>
                        <Row className='mb-3'>
                            <Col md={1}>
                                <Button variant="primary" type="submit" className='mt-4' onClick={(e) => handleSubmit(e)}>
                                    Update
                                </Button>
                            </Col>    
                            <Col md={1}>
                                <Button variant="danger" type="submit" className='mt-4'>
                                    Cancel
                                </Button>
                            </Col>
                            <Col md={{offset: 9}}>
                                <Button variant="danger" type="submit" className='mt-4' onClick={(e) => handleDelete(e)}>
                                    Delete
                                </Button>
                                <SweetAlert2 {...swalProps}

                                    onConfirm={result => {
                                        // run when clieked in confirm and promise is resolved...
                                        BeApp.deleteBlogBySlug(data.data.slug)
                                    }}
                                    onError={error => {
                                        // run when promise rejected...
                                        setSuccess(false)
                                            setError(true)
                                            setSuccessText('Error delete blog!')
                                    }}
                                    onResolve={result => {
                                        console.log(result)
                                        if(result.isConfirmed){
                                            setSuccess(true)
                                            setError(false)
                                            setSuccessText('Delete blog success!')
                                            setTimeout(()=>{
                                                navigate('/')
                                            },1500)
                                              
                                        }else{
                                            setTimeout(()=>{
                                                window.location.reload();
                                            },500)
                                        }
                                    }}
                                />
                            </Col>    
                        </Row>
                    </Form>                    
                </Container>
            </div>
            <Footer/>
        </div>
    );
};
 
export default EditBlog;