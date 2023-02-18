import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import "../../../css/MovieInfo.css";
import NavbarComponent from "../NavbarComponent";
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
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
    const LIST_ITEMS_API = `http://localhost:8000/api/my_list_items`
    const ADD_LIST_API = `http://localhost:8000/api/my_list_items/add_movie`
    const REMOVE_LIST_API = `http://localhost:8000/api/my_list_items/remove_movie/`

    const [movieInfo, setMovieInfo] = useState([])
    const [genresData, setGenresData] = useState([])
    const [movieRoles, setMovieRoles] = useState([])
    const [actorsInMovie, setActorsInMovie] = useState([])
    const [movieActorsPhoto, setMovieActorsPhoto] = useState([])
    const [moviesInList, setMoviesInList] = useState([])
    const [nextListMovieId, setNextListMovieId] = useState("")

    const [playTrailer, setPlayerTrailer] = useState(false)

    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    useEffect(() => {
        getMovieData(MOVIE_API)
        getRolesData(ROLE_API)
        getGenresData(GENRE_API)
        getListData(LIST_ITEMS_API)
    }, [])

    //Roles Data
    async function getRolesData(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                console.log("data role api:")
                console.log(data)
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

    //Movie Data
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("data[id]:")
                console.log(data[id - 1])
                setMovieInfo(data[id - 1])
            })
    }

    //Genre Data
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
                // console.log(moviePossibleGenres)
                setGenresData(moviePossibleGenres)
            })
    }

    //List Data
    async function getListData(LIST_ITEMS_API) {
        await fetch(LIST_ITEMS_API)
            .then(res => res.json())
            .then(data => {
                setNextListMovieId(data.length + 1);
                // console.log("listdata:")
                // console.log(data)
                setMoviesInList(data)
            })
    }

    var hoursAndMinutes = parseInt(movieInfo.runtime / 60) + "h " + movieInfo.runtime % 60 + "m"

    let trailer_key = "";
    try {
        trailer_key = movieInfo.trailer
    } catch (error) {
        trailer_key = ""
    }

    const opts = {
        height: '562',
        width: '1000',
    }

    //checkIfMovieInList()
    //const trailer = selectedMovie.videos.results.find(vid -> vid.name === "Official Trailer")

    function removeMovie(id) {
        axios.delete(REMOVE_LIST_API + id)
            .then(() => {
                getListData(LIST_ITEMS_API)
                handleCloseRemoveModal()
                toast.error(`You just removed "${movieInfo.title}" from your list!`, {
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

    //Add Movie to List
    function addMovieToList(movie_id, nextListMovieId) {
        const data = { "id": nextListMovieId, "fk_id_movie": movie_id, "fk_id_my_list": 1 };

        fetch(ADD_LIST_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(() => {
                console.log('Success:', data);
                getListData(LIST_ITEMS_API)
                toast.success(`You just added "${movieInfo.title}" to your list!`, {
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

    function buttonAddMovieClick() {
        addMovieToList(id, nextListMovieId)
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
                                            {<Button className="movie-list-button-option" variant="outline-success" id="btn-add-movie" onClick={buttonAddMovieClick}>
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
