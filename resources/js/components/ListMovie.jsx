import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { motion } from "framer-motion";
import star from "./images/star.png";
import "../../css/ListMovie.css";

function ListMovie ({ movie: { id, title, year, rating, cover}, removeMovie}) {
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [show, setShow] = useState(false);

    return (
        <>
            <div className="movie">
                <motion.div
                    whileTap={{ scale: 0.9 }}
                >
                    <div className="movie-info-container">
                        <Link style={{ textDecoration: 'none', color: "white" }} to={`/movie_info/${id}`}>
                            <img className="movie-poster" src={`/uploads/movie_images/cover/${cover}`} alt="poster" />
                            <div className="movie-info">
                                <h4>{title}</h4>
                                <span>{year}</span>
                            </div>
                            <div className="movie-over">
                                <div className="movie-rating">
                                    <h2>{rating}</h2>
                                    <img src={star} alt="star" />
                                </div>
                                <button type="button" className="btn btn-outline-primary">
                                    <i className="fas fa-info-circle"></i> Show More Info
                                </button>
                            </div>
                        </Link>
                    </div>
                </motion.div>
                <motion.div
                    className="movie-button-container"
                    whileTap={{ scale: 0.9 }}
                >
                    <Button
                        className="remove--button"
                        variant="outline-danger"
                        key={id} id={"remove_btn_" + id}
                        onClick={handleShowModal}>
                        <i className="far fa-trash-alt"></i> Remove from the list
                    </Button>{' '}
                </motion.div>
            </div>
            <Modal centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this movie from your list?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => removeMovie(id, title)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ListMovie
