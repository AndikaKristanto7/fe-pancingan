// BlogNav.js
 
import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import Login from "./Login";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const BlogNav = () => {
    const {isLogin, email,isAdmin } = useContext(LoginContext)
    return (
        <div>
            <Navbar style={{
                backgroundColor:"#A3C1D4"
            }}>
                <Navbar.Brand href="#home" style={{color:"white", marginLeft:"10px"}}><Link to={`/`}>Pancingan</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
                    <Nav className="col-md-1">
                        {
                            isLogin ? <Link to={`/new-blog`}>New Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="col-md-1">
                        {
                            isLogin ? <Link to={`/my-blog/${email}`}>My Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="col-md-1">
                        {
                            isLogin && isAdmin() ? <Link to={`/unpublished`}>Unpublished Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="col-md-1">
                        <Login/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
 
export default BlogNav;