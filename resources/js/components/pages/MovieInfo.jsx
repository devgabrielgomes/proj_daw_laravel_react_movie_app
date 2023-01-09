import React, { useState, useEffect } from "react";
import "../../../css/MovieInfo.css";
import NavbarComponent from "../NavbarComponent";
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import YouTube from "react-youtube";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import star from "../images/star.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovieInfo() {
    let params = useParams();
    let movieId = params.id
    const MOVIE_API = `https://api.themoviedb.org/3/movie/${movieId}?api_key=3bf31c72f99e4189266c43358ac6e189`
    const IMG_API = `https://image.tmdb.org/t/p/w1280`
    const TRAILER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3bf31c72f99e4189266c43358ac6e189&language=en-US`
    const LIST_API = `https://api.themoviedb.org/3/list/8209568?api_key=3bf31c72f99e4189266c43358ac6e189`
    const REMOVE_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`
    const ADD_LIST_API = `https://api.themoviedb.org/3/list/8209568/add_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`
    const CREDITS_API = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=3bf31c72f99e4189266c43358ac6e189&language=en-US`
    const [movieInfo, setMovieInfo] = useState({})
    const [playTrailer, setPlayerTrailer] = useState(false)
    const [moviesInList, setMoviesInList] = useState([])
    const [movieGenres, setMovieGenres] = useState([])
    const [creditsNamesData, setCreditsNameData] = useState([])
    const [creditsPicData, setCreditsPicData] = useState([])
    const [creditsCharacterData, setCreditsCharacterData] = useState([])
    const [show, setShow] = useState(false);

    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    useEffect(() => {
        getMovieData(MOVIE_API)
        getListData(LIST_API)
        getTrailerData(LIST_API)
        getCreditsData(CREDITS_API)
    }, [])


    //Movie Data
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("Movie Data:")
                console.log(data)

                var k = 0;
                var tempMovieGenresArray = []
                while (k < data.genres.length) {
                    tempMovieGenresArray[k] = data.genres[k].name
                    k += 1
                }
                setMovieInfo(data)
                setMovieGenres(tempMovieGenresArray)
            })
    }

    var hoursAndMinutes = parseInt(movieInfo.runtime / 60) + "h " + movieInfo.runtime % 60 + "m"

    //List Data
    async function getListData(LIST_API) {
        await fetch(LIST_API)
            .then(res => res.json())
            .then(data => {
                setMoviesInList(data.items)
            })
    }

    //Credits Data
    async function getCreditsData(CREDITS_API) {
        await fetch(CREDITS_API)
            .then(res => res.json())
            .then(data => {
                var k = 0;
                let tempCreditsNamesArray = [];
                let tempCreditsPicArray = [];
                let tempCreditsCharacterArray = [];
                console.log(data)

                while (k < 4) {
                    tempCreditsNamesArray[k] = data.cast[k].name;
                    tempCreditsPicArray[k] = IMG_API + data.cast[k].profile_path;
                    tempCreditsCharacterArray[k] = data.cast[k].character;
                    k += 1
                }
                setCreditsPicData(tempCreditsPicArray)
                setCreditsNameData(tempCreditsNamesArray)
                setCreditsCharacterData(tempCreditsCharacterArray)
                console.log(tempCreditsCharacterArray)
            })
    }

    //Trailer Data
    async function getTrailerData() {
        await fetch(`${TRAILER_API}/${movieId}`)
            .then(res => res.json())
            .then(data => {
                setPlayerTrailer(data)
            })
    }

    const release_date = String((movieInfo.release_date)).substring(0, 4)

    let trailer_key = "";
    try {
        trailer_key = playTrailer.results[0].key
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
        const data = { "media_id": id };

        fetch(REMOVE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                getListData(LIST_API)
                handleCloseRemoveModal()
                toast.error(`You just removed "${movieInfo.title ? movieInfo.title : movieInfo.name}" from your list!`, {
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
            .catch((error) => {
                console.error('Error:', error);

            });
    }

    function addMovie(movie_id) {
        const data = { "media_id": movie_id };

        fetch(ADD_LIST_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                getListData(LIST_API)
                toast.success(`You just added "${movieInfo.title ? movieInfo.title : movieInfo.name}" to your list!`, {
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
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    function buttonAddMovieClick() {
        addMovie(movieInfo.id)
        setShow(true)
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
                <img className="background" src={IMG_API + movieInfo.backdrop_path} alt="">
                </img>
                <div className="movieinfo">
                    <Row className="movie--information">
                        <Col className="movie-poster-col" xs={12} md={4} lg={4} xxl={4} align="center">
                            <img className="movieinfo-poster" src={movieInfo.poster_path ? IMG_API + movieInfo.poster_path : "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"} alt={movieInfo.title} />
                        </Col>
                        <Col className="movieinfo-col" xs={12} md={8} xxl={8}>
                            <Row>
                                <Col className="movie-title-year" md={9} sm={10} xs={8} xxl={10}>
                                    <h1>{movieInfo.title ? movieInfo.title : movieInfo.name}</h1>
                                    <span className="movieinfo--release">{release_date}</span>
                                </Col>
                                <Col className="movie-list-button" sm={2} xs={4} xxl={2}>
                                    {moviesInList.find(mil => mil.id === movieInfo.id) ?
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
                                        <h2>{String(movieInfo.vote_average).substring(0, 3)}</h2>
                                        <img className="info-rating-img" src={star} alt="star" />
                                    </div>

                                    <span className="movie--genres">{movieGenres.join(', ')}</span><br></br>

                                    <span className="runtime">{hoursAndMinutes}</span>
                                </Row>
                                <Row className="synopsis">
                                    <div>
                                        <h5 className="synopsis-title">Synopsis</h5>
                                        <span className="synopsis--text">{movieInfo.overview}</span>
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
                                                <img id="actor-pic" src={creditsPicData[0]} alt={creditsNamesData[0]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{creditsNamesData[0]}</b> <br></br> as {creditsCharacterData[0]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={creditsPicData[1]} alt={creditsNamesData[1]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{creditsNamesData[1]}</b> <br></br> as {creditsCharacterData[1]}</span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="actor-row">
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={creditsPicData[2]} alt={creditsNamesData[2]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{creditsNamesData[2]}</b> <br></br> as {creditsCharacterData[2]}</span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            <Row className="actor-container">
                                                <img id="actor-pic" src={creditsPicData[3]} alt={creditsNamesData[3]}></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{creditsNamesData[3]}</b> <br></br> as {creditsCharacterData[3]}</span>
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
