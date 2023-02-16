import React, {useEffect, useState} from "react";
import NavbarComponent from "@/components/NavbarComponent";
import {Button, Table} from "react-bootstrap";
import "../../../css/Management.css";
import {Link} from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListMovie from "@/components/ListMovie";
import Modal from "react-bootstrap/Modal";
import ManagementMovie from "@/components/ManagementMovie";

const MOVIE_API = `http://localhost:8000/api/movies`
const REMOVE_MOVIE_API = `http://localhost:8000/api/movies/remove_movie/`

function Management() {
    const [movies, setMovies] = useState([])
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);

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

    const removeMovie = async (id, title) => {
        console.log(id);
        axios.delete(REMOVE_MOVIE_API + id)
            .then(() => {
                getMovies(MOVIE_API)
                handleCloseRemoveModal()
                toast.error(`You just removed "${title}" from your list!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
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
                                        <ManagementMovie movie={movie} key={"management_movie_" + movie.id} removeMovie={removeMovie}/>
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


