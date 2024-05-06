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
import moment from 'moment'
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
    const [createdBy, setCreatedBy] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    
    useEffect(()=>{
        setDisplayEdit(isSameUser(data.data.email))
        setDisplayPublish(isAdmin() && data.data.is_published === "N")
        
        setCreatedBy(data.data.name)
        let createdAt = data.data.created_at 
        createdAt = moment(createdAt).format('D MMMM YYYY')
        setCreatedAt(createdAt)
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
            text: 'Confirm publish this blog?',
            confirmButtonText: "Publish!",
            showCancelButton: true,
            denyButtonText: `Don't Publish!`,
        });
    }
    let wordWrap = {
        "word-wrap" : "break-word",
    }

    return (
        <div className="d-flex flex-column min-vh-100"> 
            <div className="main-container" style={{backgroundColor: "aliceblue"}}>
                <BlogNav/>
                <Container>
                    <Row className='mb-3'>
                        <Col className={'text-center'} style={wordWrap}>
                            <h1>{data.data.title}</h1>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={{span:12}} className='text-center' >
                            <Image className="center-block" src={data.data.image} fluid/>
                        </Col>
                    </Row>
                    <Row className='text-center mb-3'>
                        <Col md={12}>
                            <h5>By {createdBy} - {createdAt} </h5>
                        </Col>
                    </Row>
                    <Row className='mb-3' style={wordWrap}>
                        <Col md={12} className='text-justify'>
                            <p dangerouslySetInnerHTML={{__html:data.data.description}}></p>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={12}><h5>Location</h5></Col>
                        <Col md={12}>
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