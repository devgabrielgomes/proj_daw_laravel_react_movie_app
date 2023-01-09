import React from "react";
import NavbarComponent from "@/components/NavbarComponent";
import {Button, Table} from "react-bootstrap";
import "../../../css/Management.css";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Management() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ transition: { duration: 5 } }}
            >
            <NavbarComponent />
            <div className="table-container">
                <h2 className="page-title">Management</h2>
                <b className="number-movies">Current number of movies in website: 2</b>
                <Link to="/management/change">
                    <Button className="add-movie-btn" variant="success">
                        <i className="fas fa-plus"></i> Add new movie
                    </Button>{' '}
                </Link>
                <Table className="table" striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th className="number-th">Number</th>
                        <th className="cover-th">Cover</th>
                        <th className="title-th">Title</th>
                        <th className="actions-th">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="number">
                            1
                        </td>
                        <td>
                            <img src="https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" width="100px" alt="movie-poster"></img>
                        </td>
                        <td className="title">Mark</td>
                        <td>
                            <div className="button-container">
                                <Button className="edit-button block" variant="primary">
                                    <i className="far fa-edit"></i> Edit
                                </Button>{' '}
                                <Button className="delete-button block" variant="danger">
                                    <i className="far fa-trash-alt"></i> Delete
                                </Button>{' '}
                            </div>
                            </td>
                    </tr>
                    <tr>
                        <td className="number">
                            2
                        </td>
                        <td>
                            <img src="https://image.tmdb.org/t/p/w1280/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" width="100px" alt="movie-poster"></img>
                        </td>
                        <td className="title">Jacob</td>
                        <td>
                            <Button className="edit-button block" variant="primary">
                                <i className="far fa-edit"></i> Edit
                            </Button>{' '}
                            <Button className="delete-button block" variant="danger">
                                <i className="far fa-trash-alt"></i> Delete
                            </Button>{' '}
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            </motion.div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
}

export default Management;


