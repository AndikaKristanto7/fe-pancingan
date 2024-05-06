// BlogNav.js
 
import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import Login from "./Login";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";

const BlogNav = () => {
    const {isLogin, email,isAdmin } = useContext(LoginContext)
    const linkTextDecor = {
        textDecoration : 'none'
    }
    return (
        <div>
            <Navbar style={{
                backgroundColor:"#A3C1D4",
                
            }}>
                <Navbar.Brand href="#home" style={{color:"white", marginLeft:"10px"}}><Link to={`/`} style={{...linkTextDecor}}>Pancingan</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav" className="d-flex flex-row justify-content-end">
                    <Nav className="p-2">
                        {
                            isLogin ? <Link to={`/my-blog/${email}`} style={{...linkTextDecor}}>My Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="p-2">
                        {
                            isLogin && isAdmin() ? <Link to={`/unpublished`} style={{...linkTextDecor}}>Unpublished Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="p-2">
                        {
                            isLogin ? <Link to={`/new-blog`} style={{...linkTextDecor}}>New Blog</Link> : ''
                        }
                    </Nav>
                    <Nav className="p-2">
                        <Login/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
 
export default BlogNav;