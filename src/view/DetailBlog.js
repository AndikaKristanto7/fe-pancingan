// App.js
import React, { useContext, useEffect, useState } from 'react';
import BlogNav from '../component/BlogNav';
import Footer from '../component/Footer';
import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, Image, Row } from 'react-bootstrap';
import { lazy } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { LoginContext } from '../context/LoginContext.js';
import SweetAlert2 from 'react-sweetalert2';
import BeApp from '../helpers/api_call/BeApp.js';
const Map = lazy(() => import('../component/Map.js'));

const DetailBlog = () => {
    const { data } = useLoaderData();
    const navigate = useNavigate({})
    const {isSameUser,isAdmin} = useContext(LoginContext)
    const [displayEdit, setDisplayEdit] = useState(false)
    const [displayPublish, setDisplayPublish] = useState(false)
    const [swalProps, setSwalProps] = useState({});
    const [isErrorPublish, setErrorPublish] = useState(false)
    const [isSuccessPublish, setSuccessPublish] = useState(false)
    const [errorText, setErrorText] = useState('')
    const [successText, setSuccessText] = useState('')
    
    useEffect(()=>{
        setDisplayEdit(isSameUser(data.data.email))
        setDisplayPublish(isAdmin() && data.data.is_published === "N")
    },[])

    function handleEdit(e){
        navigate(`/edit/blog/${data.data.slug}`)
    }

    function handlePublish(e){
        e.stopPropagation()
        e.preventDefault()
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
                    <Row className=''>
                        <Col md={{ span: 6, offset: 4 }} center>
                            <h1>{data.data.title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{span:12}} className='text-center'>
                            <Image className="center-block" src={data.data.image} fluid/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className='text-justify'>
                            <p dangerouslySetInnerHTML={{__html:data.data.description}}></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>Location</Col>
                        
                        <Col md={6}>
                            <Map mapData={JSON.parse(data.data.location)} onDataChange={((e)=> true)} autocompleteMap={false}></Map>
                        </Col>
                    </Row>
                    <Row className={displayEdit ? 'mb-3' :'mb-3 d-none'}>
                        <Col md={1}>
                            <Button variant="primary" className='mt-4' onClick={(e) => handleEdit(e)}>
                                Edit
                            </Button>
                        </Col>        
                    </Row>
                    <Row className={displayPublish ? 'mb-3' :'mb-3 d-none'}>
                        <Alert show={isSuccessPublish} id="alert-success" variant='primary' >
                            { successText }
                        </Alert>
                        <Alert show={isErrorPublish} id="alert-error" variant='danger' dismissible>
                            { errorText }
                        </Alert>
                        <Col md={1}>
                            <Button variant="primary" className='mt-4' onClick={(e) => handlePublish(e)}>
                                Publish
                            </Button>
                        </Col>
                        <SweetAlert2 {...swalProps}
                                onConfirm={result => {
                                    // run when clieked in confirm and promise is resolved...
                                    BeApp.publishBlog(data.data.slug)
                                }}
                                onError={error => {
                                    // run when promise rejected...
                                    setErrorText('Error publish blog!')
                                }}
                                onResolve={result => {
                                    if(result.isConfirmed){
                                        setSuccessPublish(true)
                                        setErrorPublish(false)
                                        setSuccessText('Publish blog success!')
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
                    </Row>
                </Container>
            </div>
            <Footer/>
        </div>
    );
};
 
export default DetailBlog;