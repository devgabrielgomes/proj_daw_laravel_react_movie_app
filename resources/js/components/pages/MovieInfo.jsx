import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../../../css/MovieInfo.css";
import NavbarComponent from "../NavbarComponent";
import { Row, Col, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import star from "../images/star.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {parseInt} from "lodash";

function MovieInfo() {
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://localhost:8000/api/movies`
    const GENRE_API = `http://localhost:8000/api/movie_genres/`
    const ROLE_API = `http://localhost:8000/api/roles`
    const LIST_ITEMS_API = `http://localhost:8000/api/my_list_items/get_items`
    const ADD_LIST_API = `http://localhost:8000/api/my_list_items/add`
    const REMOVE_LIST_API = `http://localhost:8000/api/my_list_items/remove/`

    const [movieInfo, setMovieInfo] = useState([])
    const [genresData, setGenresData] = useState([])
    const [movieRoles, setMovieRoles] = useState([])
    const [actorsInMovie, setActorsInMovie] = useState([])
    const [movieActorsPhoto, setMovieActorsPhoto] = useState([])
    const [moviesInList, setMoviesInList] = useState([])
    const [nextListMovieId, setNextListMovieId] = useState("")

    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    useEffect(() => {
        getMovieData(MOVIE_API)
        getRolesData(ROLE_API)
        getGenresData(GENRE_API)
        getListData(LIST_ITEMS_API)
    }, [])

    /**
     * GET request to set roles data
     * @async
     * @param ROLE_API
     * @returns {Promise<void>}
     */
    async function getRolesData(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                var actors_name = [], movie_roles = [], actor_pic = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].idMovie == parseInt(id)) {
                        actors_name.push(data[i].actorName)
                        movie_roles.push(data[i].roleName)
                        actor_pic.push(data[i].actorPhoto)
                    }
                }
                setActorsInMovie(actors_name)
                setMovieActorsPhoto(actor_pic)
                setMovieRoles(movie_roles)
            })
    }

    /**
     * GET request to set movie data
     * @async
     * @param MOVIE_API
     * @returns {Promise<void>}
     */
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log(data[id - 1])
                setMovieInfo(data[id - 1])
            })
    }

    /**
     * GET request to set genres data
     * @async
     * @param GENRE_API
     * @returns {Promise<void>}
     */
    async function getGenresData(GENRE_API) {
        await fetch(GENRE_API)
            .then(res => res.json())
            .then(data => {
                let moviePossibleGenres = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].idMovie == id) {
                        moviePossibleGenres.push(data[i].name)
                    }
                }
                setGenresData(moviePossibleGenres)
            })
    }

    /**
     * GET request to set list items data
     * @async
     * @param LIST_ITEMS_API
     * @returns {Promise<void>}
     */
    async function getListData(LIST_ITEMS_API) {
        await fetch(LIST_ITEMS_API)
            .then(res => res.json())
            .then(data => {
                setNextListMovieId(data.length + 1);
                setMoviesInList(data)
            })
    }

    /**
     * DELETE request to remove a specific movie from the list
     */
    function removeMovie() {
        axios.delete(REMOVE_LIST_API + id)
            .then(() => {
                getListData(LIST_ITEMS_API)
                handleCloseRemoveModal()
                toastSuccess(`You just removed "${movieInfo.title}" from your list!`)
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${movieInfo.title}" from your list!`)
            })
    }

    /**
     * POST request to add a specific movie to the list
     */
    async function addMovieToList() {
        const addListFormData = new FormData()
        addListFormData.append('id', nextListMovieId)
        addListFormData.append('fk_id_movie', id)
        addListFormData.append('fk_id_my_list', 1)

        await axios.post(ADD_LIST_API, addListFormData)
            .then(() => {
                getListData(LIST_ITEMS_API)
                toastSuccess(`You just added "${movieInfo.title}" to your list!`)
            })
            .catch(({response}) => {
                toastError(`Unable to add "${movieInfo.title}" to your list!`)
            })
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

    // Transform movie runtime to hours and minutes
    let hoursAndMinutes = parseInt(movieInfo.runtime / 60) + "h " + movieInfo.runtime % 60 + "m"

    // Set the trailer information
    let trailer_key = "";
    try {
        trailer_key = movieInfo.trailer
    } catch({error}) {
        trailer_key = ""
        toastError(`Unable to get the trailer key!`)
    }

    const opts = {
        height: '562',
        width: '1000',
    }

    return (
        <>
            <NavbarComponent />
            <motion.div
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <img className="background" src={`/uploads/movie_images/background/${movieInfo.background}`} alt="">
                </img>
                <div className="movieinfo">
                    <Row className="movie--information">
                        <Col className="movie-poster-col" xs={12} md={4} lg={4} xxl={4} align="center">
                            <img className="movieinfo-poster" src={`/uploads/movie_images/cover/${movieInfo.cover}`} alt={movieInfo.title} />
                        </Col>
                        <Col className="movieinfo-col" xs={12} md={8} xxl={8}>
                            <Row>
                                <Col className="movie-title-year" md={9} sm={10} xs={8} xxl={10}>
                                    <h1>{movieInfo.title}</h1>
                                    <span className="movieinfo--release">{movieInfo.year}</span>
                                </Col>
                                <Col className="movie-list-button" sm={2} xs={4} xxl={2}>
                                    {moviesInList.find(movie => movie.idMovie === movieInfo.id) ?
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {<Button className="movie-list-button-option" variant="outline-danger" id="btn-remove-movie" onClick={handleShowRemoveModal}>
                                                <i className="far fa-trash-alt"></i>  Remove from list
                                            </Button>}
                                        </motion.div>
                                        :
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {<Button className="movie-list-button-option" variant="outline-success" id="btn-add-movie" onClick={() => addMovieToList(id)}>
                                                <i className="fas fa-folder-plus"></i>  Add to my list
                                            </Button>}
                                        </motion.div>
                                    }
                                </Col>
                            </Row>
                            <Row className="movie-details">
                                <Row>
                                    <div className="info-rating">
                                        <h2>{String(movieInfo.rating)}</h2>
                                        <img className="info-rating-img" src={star} alt="star" />
                                    </div>

                                    <span className="movie--genres">{genresData.join(', ')}</span><br></br>

                                    <span className="runtime">{hoursAndMinutes}</span>
                                </Row>
                                <Row className="synopsis">
                                    <div>
                                        <h5 className="synopsis-title">Synopsis</h5>
                                        <span className="synopsis--text">{movieInfo.synopsis}</span>
                                    </div>
                                </Row>
                            </Row>
                        </Col>
                    </Row>
                </div>

                <div className="movieinfo-extra">
                    <Row className="movieinfo-extra-row">
                        <Col className="main-actors" xxl={3} xl={2} lg={3} md={3}>
                            <Row>
                                <h3 className="title-actors">Main Actors</h3>
                            </Row>
                            <Row>
                                <Col>
                                    <Row className="actor-row">
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={`/uploads/actor_images/${movieActorsPhoto[0]}`} alt={actorsInMovie[0]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[0]}</b> <br></br> as {movieRoles[0]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={`/uploads/actor_images/${movieActorsPhoto[1]}`} alt={actorsInMovie[1]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[1]}</b> <br></br> as {movieRoles[1]}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="actor-row">
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={`/uploads/actor_images/${movieActorsPhoto[2]}`} alt={actorsInMovie[2]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[2]}</b> <br></br> as {movieRoles[2]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={`/uploads/actor_images/${movieActorsPhoto[3]}`} alt={actorsInMovie[3]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{actorsInMovie[3]}</b> <br></br> as {movieRoles[3]}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row >
                        </Col >
                        <Col xxl={9} xl={10} lg={9} md={9}>
                            <div className="trailer--container">
                                <Row>
                                    <h3 className="trailer">Trailer</h3>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="iframe-container">
                                            <YouTube videoId={trailer_key} opts={opts} />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row >
                </div >
                <Modal className="my-modal" centered show={showRemoveModal} onHide={handleCloseRemoveModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove this movie from your list?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseRemoveModal}>
                            No
                        </Button>
                        <Button variant="btn btn-danger" onClick={() => removeMovie(movieInfo.id)}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </motion.div >

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
    )
}

export default MovieInfo
