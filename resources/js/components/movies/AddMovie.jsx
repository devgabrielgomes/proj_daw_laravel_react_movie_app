import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/Change.css";
import {Link, useNavigate} from "react-router-dom";
import {read} from "@popperjs/core";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMovie() {
    const navigate = useNavigate()
    const [nextMovieID, setNextMovieID] = useState({})
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState("");
    const [allGenres, setAllGenres] = useState("");
    const [runtime, setRuntime] = useState("");
    const [actors, setActors] = useState("");
    const [actorsRoles, setActorsRoles] = useState("");
    const [trailer, setTrailer] = useState("");

    const [cover, setCover] = useState(null);
    const [background, setBackground] = useState(null);

    // const [coverImage, setCoverImage] = useState();
    // const [backgroundImage, setBackgroundImage] = useState();

    const MOVIE_API = `http://localhost:8000/api/movies`
    const ADD_MOVIE_API = `http://localhost:8000/api/movies/add_movie`
    const GENRE_API = `http://localhost:8000/api/genres/`

    useEffect(() => {
        getNextMovieID(MOVIE_API)
        getGenresData(GENRE_API)
    }, [])

    const changeHandlerCover = (e) => {
        let file = e.target.files[0]
        let cover_reader = new FileReader()
        cover_reader.onloadend = (file) => {
            setCover(cover_reader.result)
        }
        cover_reader.readAsDataURL(file)
    }

    const changeHandlerBackground = (e) => {
        let file = e.target.files[0]
        let background_reader = new FileReader()
        background_reader.onloadend = (file) => {
            setBackground(background_reader.result)
        }
        background_reader.readAsDataURL(file)
    }

    const createMovie = async (e) => {
        // e.preventDefault()
        // const movieFormData = new FormData()
        // movieFormData.append('title', title)
        // movieFormData.append('year', year)
        // movieFormData.append('rating', rating)
        // movieFormData.append('synopsis', synopsis)
        // movieFormData.append('trailer', trailer)
        // movieFormData.append('runtime', runtime)

        const movieImagesFormData = new FormData()
        movieImagesFormData.append('fk_id_movie', nextMovieID)
        movieImagesFormData.append('cover', cover)
        movieImagesFormData.append('background', background)

        function wait(ms) {
            return new Promise( (resolve) => {setTimeout(resolve, ms)});
        }
        //
        // await axios.post("http://localhost:8000/api/movies/add_movie", movieFormData)
        //     .then(async ({data}) => {
        //         toast.success(`Movie added successfully!`, {
        //             position: "top-right",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         })
        //     })
        //     .catch(({response})=>{
        //         toast.error("Unable to add movie! Check movie parameters.", {
        //             position: "top-right",
        //             autoClose: 3000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "dark",
        //         })
        //     })

        await axios.post("http://localhost:8000/api/movie_images/add_images/", movieImagesFormData)
            .then(async ({data}) => {
                toast.success(`Images added successfully!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                await wait(3500)
                navigate("/management")
            })
            .catch(({response})=>{
                toast.error("Unable to add movie images! Check image parameters.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            })
    }

    //Movie Data
    async function getNextMovieID(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("getNextMovieID:")
                // console.log(data.length + 1)
                console.log(22)
                // setNextMovieID(data.length + 1)
                setNextMovieID(22)
            })
    }

    //Genre Data
    async function getGenresData(GENRE_API) {
        await fetch(GENRE_API)
            .then(res => res.json())
            .then(data => {
                let all_genres = [];
                for (let i = 0; i < data.data.length; i++) {
                    all_genres[i] = data.data[i].name
                }
                setAllGenres(all_genres)
            })
    }

    // // When a photo is selected the image appear
    // useEffect(() => {
    //     if (cover) {
    //         const reader_cover = new FileReader();
    //         reader_cover.onloadend = () => {
    //             setCover(reader.result);
    //         };
    //         reader_cover.readAsDataURL(cover);
    //     } else {
    //         setCover(null);
    //     }
    // }, [cover]);
    //
    // // When a photo is selected the image appear
    // useEffect(() => {
    //     if (background) {
    //         const reader_background = new FileReader();
    //         reader_background.onloadend = () => {
    //             setBackground(reader.result);
    //         };
    //         reader_background.readAsDataURL(background);
    //     } else {
    //         setBackground(null);
    //     }
    // }, [background]);

    return (
        <>
            <NavbarComponent />
            <Link to="/management">

            </Link>
            <div className="form-container">
                <Row>
                    <Col sm="3">
                        <Button className="back-button" variant="secondary">
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </Button>{' '}
                    </Col>
                    <Col sm="9">
                        <h2 className="page-title">Add Movie</h2>
                    </Col>
                </Row>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Title:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Synopsis:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={synopsis} onChange={(event)=>{setSynopsis(event.target.value)}} rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Year:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={year} onChange={(event)=>{setYear(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            IMDB Rating:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={rating} onChange={(event)=>{setRating(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Genres:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={genres} onChange={(event)=>{setGenres(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Select the new movie genres while pressing "Ctrl" button:
                        </Form.Label>
                        <Col sm="9">
                            <select multiple className="form-control" id="exampleFormControlSelect2">
                                {allGenres.length > 0 && allGenres.map(genre => (
                                    <option id={genre}>{genre}</option>
                                ))}
                            </select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Runtime:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={runtime} onChange={(event)=>{setRuntime(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Main Actors:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={actors} onChange={(event)=>{setActors(event.target.value)}} rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Main Actors Roles:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={actorsRoles} onChange={(event)=>{setActorsRoles(event.target.value)}} rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Trailer ID:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={trailer} onChange={(event)=>{setTrailer(event.target.value)}} rows={1} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Cover:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
                                <Form.Label>Choose the movie cover.</Form.Label>
                                <Form.Control type="file" onChange={changeHandlerCover}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img className="movie-cover" src={cover} alt="movie-pos" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Background:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
                                <Form.Label>Choose the movie background.</Form.Label>
                                <Form.Control type="file" onChange={changeHandlerBackground}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img className="movie-background" src={background} alt="movie-bkg" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <div className="flex-parent jc-center">
                        <Button className="delete-button" variant="danger">
                            <i className="far fa-trash-alt"></i> Delete
                        </Button>{' '}
                        <Button className="save-button" variant="primary" onClick={(event)=>createMovie(event)}>
                            <i className="far fa-save"></i> Save
                        </Button>{' '}
                    </div>
            </div>
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

export default AddMovie;


