import React, { useEffect, useState } from 'react';
import { Link, Navigate } from "react-router-dom"
import "../../css/NavbarComponent.css";
import Movie from "./Movie"
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap"

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=api_key=3bf31c72f99e4189266c43358ac6e189&page=1`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=3bf31c72f99e4189266c43358ac6e189&query=`


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
                                    <Nav.Link>
                                        <Link className="nav--link" to="/">Home</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav--link" to="/mylist">MyList</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav--link" to="/management">Management</Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link className="nav--link" to="/management/change">Change</Link>
                                    </Nav.Link>
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
