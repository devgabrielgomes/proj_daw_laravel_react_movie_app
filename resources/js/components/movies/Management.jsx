import React, {useEffect, useState} from "react";
import NavbarComponent from "@/components/NavbarComponent";
import {Button, Table} from "react-bootstrap";
import "../../../css/Management.css";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListMovie from "@/components/ListMovie";

const MOVIE_API = `http://127.0.0.1:8000/api/movies`

function Management() {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getMovies(MOVIE_API)
    }, [])


    async function getMovies(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("getMovies:")
                console.log(data)
                setMovies(data)
            })
    }

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
                <b className="number-movies">Current number of movies in website: {movies.length}</b>
                <Link to="/management/add_movie">
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
                    {
                        movies.length > 0
                            ?
                            <>
                                {movies.length > 0 && movies.map(movie => (
                                    <>
                                        <tr key={movie.id}>
                                            <td className="number">
                                                {movie.id}
                                            </td>
                                            <td>
                                                <img src={`/uploads/movie_images/cover/${movie.cover}`} width="80px" alt="movie-poster"></img>
                                            </td>
                                            <td className="title">{movie.title}</td>
                                            <td>
                                                <div className="button-container">
                                                    <Link to={`/management/edit_movie/${movie.id}`}>
                                                        <Button className="edit-button block" variant="primary">
                                                            <i className="far fa-edit"></i> Edit
                                                        </Button>{' '}
                                                    </Link>
                                                    <Button className="delete-button block" variant="danger">
                                                        <i className="far fa-trash-alt"></i> Delete
                                                    </Button>{' '}
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </>
                            :
                            <h1 className="no-movies">You don't have any movies in your list!</h1>
                    }
                    </tbody>
                </Table>
            </div>
            </motion.div>
            {/*<ToastContainer*/}
            {/*    position="top-right"*/}
            {/*    autoClose={5000}*/}
            {/*    hideProgressBar={false}*/}
            {/*    newestOnTop={false}*/}
            {/*    closeOnClick*/}
            {/*    rtl={false}*/}
            {/*    pauseOnFocusLoss*/}
            {/*    draggable*/}
            {/*    pauseOnHover*/}
            {/*    theme="dark"*/}
            {/*/>*/}
        </>
    );
}

export default Management;


