import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

function ManagementMovie ({ movie: { id, title, cover}, removeMovie}) {
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    return (
        <>
            <tr key={"tr_" + id}>
                <td className="number" key={"movie_number_" + id}>
                    {id}
                </td>
                <td key={"movie_image_" + id}>
                    <img src={`/uploads/movie_images/cover/cover_movie_${id}.jpg`} width="80px" alt="movie-poster"></img>
                </td>
                <td className="title">{title}</td>
                <td>
                    <div className="button-container" key={"edit_btn_" + id}>
                        <Link to={`/management/edit_movie/${id}`}>
                            <Button className="edit-button block" variant="primary">
                                <i className="far fa-edit"></i> Edit
                            </Button>{' '}
                        </Link>
                        <Button className="delete-button block" variant="danger" key={"remove_btn_" + id} id={"remove_btn_" + id}  onClick={handleShowRemoveModal}>
                            <i className="far fa-trash-alt"></i> Delete
                        </Button>{' '}
                    </div>
                </td>
            </tr>
            <Modal centered show={showRemoveModal} onHide={handleCloseRemoveModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Remove Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this movie from the system?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemoveModal}>
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

export default ManagementMovie
