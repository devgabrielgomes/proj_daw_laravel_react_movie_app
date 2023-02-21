import React, {useEffect, useState} from "react";
import NavbarComponent from "@/components/NavbarComponent";
import {Button, Table, Row, Col} from "react-bootstrap";
import "../../../css/Management.css";
import {Link, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManagementMovie from "../../components/ManagementMovie";

const MOVIE_API = `http://localhost:8000/api/movies`
const REMOVE_MOVIE_API = `http://localhost:8000/api/movies/remove/`
const REMOVE_MOVIE_IMAGES_API = `http://localhost:8000/api/movie_images/remove/`
const REMOVE_MOVIE_GENRES_API = `http://localhost:8000/api/movie_genres/remove/`
const REMOVE_ROLES_API = `http://localhost:8000/api/roles/remove/`
const REMOVE_LIST_ITEM_API = `http://localhost:8000/api/my_list_items/remove/`

function Management() {
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);

    useEffect(() => {
        getMovies(MOVIE_API)
    }, [])

    /**
     * GET request to set movie data
     * @async
     * @param MOVIE_API
     * @returns {Promise<void>}
     */
    async function getMovies(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })
    }

    /**
     * DELETE request to remove a specific movie from the system
     * @param id
     * @param title
     * @returns {Promise<void>}
     */
    const removeMovie = async (id, title) => {
        handleCloseRemoveModal()
        axios.delete(REMOVE_MOVIE_GENRES_API + id)
            .then(() => {
                toastSuccess(`You just removed "${title}" genres from the system!`);
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${title}" genres from the system!`)
            })

        axios.delete(REMOVE_ROLES_API + id)
            .then(() => {
                toastSuccess(`You just removed "${title}" roles from the system!`);
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${title}" roles from the system!`)
            })

        axios.delete(REMOVE_LIST_ITEM_API + id)
            .then(() => {
                toastSuccess(`You just removed "${title}" from all lists!`);
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${title}" from all lists!`)
            })

        axios.delete(REMOVE_MOVIE_API + id)
            .then(() => {
                toastSuccess(`You just removed "${title}" from the system!`);
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${title}" from the system!`)
            })

        await wait(3500)
        navigate("/management")
    }

    /**
     * Stop the execution for a certain amount of time
     * @param ms
     * @returns {Promise<unknown>}
     */
    function wait(ms) {
        return new Promise( (resolve) => {setTimeout(resolve, ms)});
    }

    /**
     * Display a success toast with a specific message
     * @param message
     */
    function toastSuccess(message) {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Display an error toast with a specific message
     * @param message
     */
    function toastError(message) {
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
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
                <Row>
                    <Col sm="5">
                        <b className="number-movies">Current number of movies in website: {movies.length}</b>
                    </Col>
                    <Col sm="7">
                        <Link to="/management/add_movie">
                            <Button className="add-movie-btn" variant="success">
                                <i className="fas fa-plus"></i> Add new movie
                            </Button>{' '}
                        </Link>
                        <Link to="/management/add_actor_or_genre">
                            <Button className="add-actor-or-genre-button" variant="secondary">
                                <i className="fas fa-plus"></i> Add actor or genre
                            </Button>{' '}
                        </Link>
                    </Col>
                </Row>

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


