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
import {parseInt} from "lodash";

function MovieInfo() {
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://127.0.0.1:8000/api/v1/movies?id[eq]=${id}`
    const IMAGE_API = `http://127.0.0.1:8000/api/v1/movie_images?id[eq]=${id}`
    const GENRE_API = `http://127.0.0.1:8000/api/v1/genres?idMovie[eq]=${id}`
    const GENRE_ID_API = `http://127.0.0.1:8000/api/v1/movie_genres?idMovie[eq]=${id}`
    const ROLE_API = `http://127.0.0.1:8000/api/v1/roles?idMovie[eq]=${id}`

    const LIST_API = `https://api.themoviedb.org/3/list/8209568?api_key=3bf31c72f99e4189266c43358ac6e189`
    const REMOVE_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`
    const ADD_LIST_API = `https://api.themoviedb.org/3/list/8209568/add_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`
    const [movieInfo, setMovieInfo] = useState({})
    const [imageData, setImageData] = useState([])
    const [genresIdData, setGenresIdData] = useState([])
    const [genresData, setGenresData] = useState([])
    const [movieRoles, setMovieRoles] = useState([])
    const [rolesData, setRolesData] = useState({})
    const [playTrailer, setPlayerTrailer] = useState(false)
    const [moviesInList, setMoviesInList] = useState([])
    const [creditsNamesData, setCreditsNameData] = useState([])
    const [creditsPicData, setCreditsPicData] = useState([])
    const [creditsCharacterData, setCreditsCharacterData] = useState([])
    const [show, setShow] = useState(false);

    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);

    useEffect(() => {
        getMovieData(MOVIE_API)
        getImageData(IMAGE_API)
        getGenresData(GENRE_API)
        getGenresIdData(GENRE_ID_API)
        getRolesData(ROLE_API)
        // getListData(LIST_API)
    }, [])


    //Movie Data
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("Movie Data:")
                console.log(data.data[0])
                setMovieInfo(data.data[0])
            })
    }

    //Image Data
    async function getImageData(IMAGE_API) {
        await fetch(IMAGE_API)
            .then(res => res.json())
            .then(data => {
                console.log("Images Data:")
                console.log(data.data[0])
                setImageData(data.data[0])
            })
    }

    //Genre Data
    async function getGenresData(GENRE_API) {
        await fetch(GENRE_API)
            .then(res => res.json())
            .then(data => {
                let moviePossibleGenres = [];
                data.data.forEach(element => moviePossibleGenres.push(element.name));

                console.log("Movie Possible Genres:")
                console.log(moviePossibleGenres)
                setGenresData(moviePossibleGenres)
            })
    }

    //Genres IDs
    async function getGenresIdData(GENRE_ID_API) {
        await fetch(GENRE_ID_API)
            .then(res => res.json())
            .then(data => {
                let currentMovieGenresIds = [];
                data.data.forEach(element => currentMovieGenresIds.push(element.idGenre));

                console.log("GenresId Data:")
                console.log(currentMovieGenresIds)
                setGenresIdData(currentMovieGenresIds)
            })
    }

    //Roles Data
    async function getRolesData(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                var movieRoles = [];
                var actorsIds = [];
                data.data.forEach(element => movieRoles.push(element.name));
                data.data.forEach(element => actorsIds.push(element.idActor));

                console.log("movieRoles:")
                console.log(movieRoles)
                console.log("actorsIds:")
                console.log(actorsIds)
                setMovieRoles(movieRoles)
                setRolesData(data.data)
            })
    }

    var movieGenres = [];

    genresIdData.forEach(element => movieGenres.push(genresData[element - 1]));
    console.log("movieGenres:")
    console.log(movieGenres)

    var hoursAndMinutes = parseInt(movieInfo.runtime / 60) + "h " + movieInfo.runtime % 60 + "m"


    //List Data
    // async function getListData(LIST_API) {
    //     await fetch(LIST_API)
    //         .then(res => res.json())
    //         .then(data => {
    //             setMoviesInList(data.items)
    //         })
    // }

    //Credits Data
    // async function getCreditsData(CREDITS_API) {
    //     await fetch(CREDITS_API)
    //         .then(res => res.json())
    //         .then(data => {
    //             var k = 0;
    //             let tempCreditsNamesArray = [];
    //             let tempCreditsPicArray = [];
    //             let tempCreditsCharacterArray = [];
    //             console.log(data)
    //
    //             while (k < 4) {
    //                 tempCreditsNamesArray[k] = data.cast[k].name;
    //                 tempCreditsPicArray[k] = IMG_API + data.cast[k].profile_path;
    //                 tempCreditsCharacterArray[k] = data.cast[k].character;
    //                 k += 1
    //             }
    //             setCreditsPicData(tempCreditsPicArray)
    //             setCreditsNameData(tempCreditsNamesArray)
    //             setCreditsCharacterData(tempCreditsCharacterArray)
    //             console.log(tempCreditsCharacterArray)
    //         })
    // }

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



    // function removeMovie(id) {
    //     const data = { "media_id": id };
    //
    //     fetch(REMOVE_API, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //             getListData(LIST_API)
    //             handleCloseRemoveModal()
    //             toast.error(`You just removed "${movieInfo.title ? movieInfo.title : movieInfo.name}" from your list!`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //
    //         });
    // }

    // function addMovie(movie_id) {
    //     const data = { "media_id": movie_id };
    //
    //     fetch(ADD_LIST_API, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //             getListData(LIST_API)
    //             toast.success(`You just added "${movieInfo.title ? movieInfo.title : movieInfo.name}" to your list!`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    //
    //
    // function buttonAddMovieClick() {
    //     addMovie(movieInfo.id)
    //     setShow(true)
    // }

    return (
        <>
            <NavbarComponent />
            <motion.div
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <img className="background" src={`/uploads/movie_images/background/${imageData.background}`} alt="">
                </img>
                <div className="movieinfo">
                    <Row className="movie--information">
                        <Col className="movie-poster-col" xs={12} md={4} lg={4} xxl={4} align="center">
                            <img className="movieinfo-poster" src={`/uploads/movie_images/cover/${imageData.cover}`} alt={movieInfo.title} />
                        </Col>
                        <Col className="movieinfo-col" xs={12} md={8} xxl={8}>
                            <Row>
                                <Col className="movie-title-year" md={9} sm={10} xs={8} xxl={10}>
                                    <h1>{movieInfo.title}</h1>
                                    <span className="movieinfo--release">{movieInfo.year}</span>
                                </Col>
                                {/*<Col className="movie-list-button" sm={2} xs={4} xxl={2}>*/}
                                {/*    {moviesInList.find(mil => mil.id === movieInfo.id) ?*/}
                                {/*        <motion.div*/}
                                {/*            whileTap={{ scale: 0.9 }}*/}
                                {/*        >*/}
                                {/*            {<Button className="movie-list-button-option" variant="outline-danger" id="btn-remove-movie" onClick={handleShowRemoveModal}>*/}
                                {/*                <i className="far fa-trash-alt"></i>  Remove from list*/}
                                {/*            </Button>}*/}
                                {/*        </motion.div>*/}

                                {/*        :*/}

                                {/*        <motion.div*/}
                                {/*            whileTap={{ scale: 0.9 }}*/}
                                {/*        >*/}
                                {/*            {<Button className="movie-list-button-option" variant="outline-success" id="btn-add-movie" onClick={buttonAddMovieClick}>*/}
                                {/*                <i className="fas fa-folder-plus"></i>  Add to my list*/}
                                {/*            </Button>}*/}
                                {/*        </motion.div>*/}
                                {/*    }*/}
                                {/*</Col>*/}
                            </Row>
                            <Row className="movie-details">
                                <Row>
                                    <div className="info-rating">
                                        <h2>{String(movieInfo.rating)}</h2>
                                        <img className="info-rating-img" src={star} alt="star" />
                                    </div>

                                    <span className="movie--genres">{movieGenres.join(', ')}</span><br></br>

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

                <Col>*/}
                    {/*<Row className="actor-container">*/}
                    {/*    <img id="actor-pic" src={} alt={"TESTE"}></img>*/}
                    {/*</Row>*/}
                    <Row>
                        <span className="actor-name"><b>{}</b> <br></br> as {"creditsCharacterData[0]"}</span>
                    </Row>
                </Col>

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
                                                <img id="actor-pic" src={`/uploads/actor_images/${imageData.photo}`} alt="idk"></img>
                                            </Row>
                                            <Row>
                                                <span className="actor-name"><b>{movieRoles[0]}</b> <br></br> as </span>
                                            </Row>
                                        </Col>
                                        <Col>
                                            {/*<Row className="actor-container">*/}
                                            {/*    <img id="actor-pic" src={creditsPicData[1]} alt={creditsNamesData[1]}></img>*/}
                                            {/*</Row>*/}
                                            <Row>
                                                <span className="actor-name"><b>{movieRoles[1]}</b> <br></br> as </span>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="actor-row">
                                        <Col>
                                            {/*<Row className="actor-container">*/}
                                            {/*    <img id="actor-pic" src={creditsPicData[2]} alt={creditsNamesData[2]}></img>*/}
                                            {/*</Row>*/}
                                            <Row>
                                                <span className="actor-name"><b>{movieRoles[2]}</b> <br></br> as </span>
                                            </Row>
                                        </Col>
                                        {/*<Col>*/}
                                        {/*    <Row className="actor-container">*/}
                                        {/*        <img id="actor-pic" src={creditsPicData[3]} alt={creditsNamesData[3]}></img>*/}
                                        {/*    </Row>*/}
                                        {/*    <Row>*/}
                                        {/*        <span className="actor-name"><b>{creditsNamesData[3]}</b> <br></br> as {creditsCharacterData[3]}</span>*/}
                                        {/*    </Row>*/}
                                        {/*</Col>*/}
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
        {/*        <Modal className="my-modal" centered show={showRemoveModal} onHide={handleCloseRemoveModal}>*/}
        {/*            <Modal.Header closeButton>*/}
        {/*                <Modal.Title>Remove Movie</Modal.Title>*/}
        {/*            </Modal.Header>*/}
        {/*            <Modal.Body>Are you sure you want to remove this movie from your list?</Modal.Body>*/}
        {/*            <Modal.Footer>*/}
        {/*                <Button variant="secondary" onClick={handleCloseRemoveModal}>*/}
        {/*                    No*/}
        {/*                </Button>*/}
        {/*                <Button variant="btn btn-danger" onClick={() => removeMovie(movieInfo.id)}>*/}
        {/*                    Yes*/}
        {/*                </Button>*/}
        {/*            </Modal.Footer>*/}
        {/*        </Modal>*/}
            </motion.div >

        {/*    <ToastContainer*/}
        {/*        position="top-right"*/}
        {/*        autoClose={5000}*/}
        {/*        hideProgressBar={false}*/}
        {/*        newestOnTop={false}*/}
        {/*        closeOnClick*/}
        {/*        rtl={false}*/}
        {/*        pauseOnFocusLoss*/}
        {/*        draggable*/}
        {/*        pauseOnHover*/}
        {/*        theme="dark"*/}
        {/*    />*/}
        </>
    )
}

export default MovieInfo
