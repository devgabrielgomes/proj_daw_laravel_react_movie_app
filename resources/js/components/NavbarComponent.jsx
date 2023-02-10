import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom"
import "../../css/NavbarComponent.css";
import Movie from "./Movie"
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap"

const NavbarComponent = () => {

    return (
        <div className="navbar-container">
            <div id='row'>
                <div id='col-md-12'>
                    <Navbar bg="dark" expand="lg" variant="dark">
                        <Container fluid>
                            <Navbar.Brand className="movieguru" href="/">
                                <h4 className="movie-letter">Movie</h4>
                                <h4 className="guru-letter">Guru</h4>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll">
                                <Nav
                                    className="me-auto my-2 my-lg-0 justify-content-end"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                </Nav>
                                <Form className="d-flex">
                                    <Link to="/">
                                        <div className="nav--link">Home</div>
                                    </Link>
                                    <Link to="/my_list">
                                        <div className="nav--link">MyList</div>
                                    </Link>
                                    <Link to="/management">
                                        <div className="nav--link">Management</div>
                                    </Link>
                                    <Link to="/management/add_movie">
                                        <div className="nav--link">Change</div>
                                    </Link>
                                </Form>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </div>
    )

}

export default NavbarComponent
