// BlogNav.js
 
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav } from 'react-bootstrap';
import Login from "../Login";
import { Link } from "react-router-dom";
 
const BlogNav = () => {
    return (
        <div>
            <Navbar style={{
                backgroundColor:"#A3C1D4"
            }}>
                <Navbar.Brand href="#home" style={{color:"white", marginLeft:"10px"}}>Pancingan</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav" className="d-flex justify-content-end">
                    <Nav>
                        <Nav.Link href="#home" style={{color:"white"}}>
                            <Link to={`new-blog`}>New Blog</Link>
                        </Nav.Link>
                        <Nav.Link href="#home" style={{color:"white"}}>

                            <Login/>

                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}
 
export default BlogNav;