import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/Change.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {read} from "@popperjs/core";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListMovie from "@/components/ListMovie";
import {parseInt} from "lodash";
import {forIn} from "lodash/object";

function EditMovie() {
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://127.0.0.1:8000/api/movies`
    const MOVIE_GENRE_API = `http://127.0.0.1:8000/api/movie_genres/`
    const GENRE_API = `http://127.0.0.1:8000/api/genres/`
    const ROLE_API = `http://127.0.0.1:8000/api/roles`
    const [movieInfo, setMovieInfo] = useState({})
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState("");
    const [movieGenres, setMovieGenres] = useState("");
    const [runtime, setRuntime] = useState("");
    const [movieActors, setMovieActors] = useState("");
    const [actorsRoles, setActorsRoles] = useState("");
    const [trailer, setTrailer] = useState("");
    const [poster, setPoster] = useState();
    const [posterImage, setPosterImage] = useState("");
    const [background, setBackground] = useState();
    const [backgroundImage, setBackgroundImage] = useState("");


    useEffect(() => {
        getMovieData(MOVIE_API)
        getGenresData(GENRE_API)
        getMovieGenresData(MOVIE_GENRE_API)
        getRolesData(ROLE_API)
    }, [])

    useEffect(() => {
            if (poster) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPosterImage(reader.result);
                };
                reader.readAsDataURL(poster);
            } else {
                setPosterImage(null);
            }
        }, [poster]);

    useEffect(() => {
        if (background) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result);
            };
            reader.readAsDataURL(background);
        } else {
            setBackgroundImage(null);
        }
    }, [background]);

    //Movie Data
    async function getMovieData(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                console.log("data[id]:")
                console.log(data[id - 1])
                setMovieInfo(data[id - 1])
                setYear(data[id - 1].year)
                setTitle(data[id - 1].title)
                setDescription(data[id - 1].synopsis)
                setRating(data[id - 1].rating)
                setRuntime(data[id - 1].runtime)
                setTrailer(data[id - 1].trailer)
                setPosterImage(data[id - 1].cover)
                setBackgroundImage(data[id - 1].background)
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
                console.log("all_genres:")
                console.log(all_genres)
                setGenres(all_genres)
            })
    }

    //Genre Data
    async function getMovieGenresData(MOVIE_GENRE_API) {
        await fetch(MOVIE_GENRE_API)
            .then(res => res.json())
            .then(data => {
                let movie_genres = [];

                for (let i = 0; i < data.length; i++) {
                    if (data[i].idMovie == id) {
                        movie_genres.push(data[i].name)
                    }
                }

                console.log("movie_genres:")
                console.log(movie_genres)
                setMovieGenres(movie_genres)
            })
    }

    //Roles Data
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
                setMovieActors(actors_name)
                setActorsRoles(movie_roles)
                //setActorsImage(actor_pic)

            })
    }



    function onPosterChange() {
        var newPoster = document.getElementById("new-poster").value;
        console.log("newPoster: ", newPoster)
    }

    const createMovie = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('year', year)
        formData.append('description', description)
        formData.append('rating', rating)
        formData.append('genres', genres)
        formData.append('runtime', runtime)
        formData.append('actors', actors)
        formData.append('actorsRoles', actorsRoles)
        formData.append('trailer', trailer)
        formData.append('posterImage', posterImage)
        formData.append('backgroundImage', backgroundImage)

        await axios.post("/api/add_movie/", formData)
            .then(({data}) => {
                toast.success(`Movie added successfully!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
                navigate("/")
            })
            .catch(({response})=>{

            })
    }

    let test;
    return (
        <>
            <NavbarComponent />
            <div className="form-container">
                <Link to="/management">
                    <Button className="back-button" variant="secondary">
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </Button>{' '}
                </Link>
                <h2 className="page-title">Edit Movie</h2>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Title:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder="" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Movie Description:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={description} onChange={(event)=>{setDescription(event.target.value)}} rows={5} placeholder="" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Year:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={year} onChange={(event)=>{setYear(event.target.value)}} placeholder="" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            IMDB Rating:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={rating} onChange={(event)=>{setRating(event.target.value)}} placeholder="" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Genres:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={movieGenres} onChange={(event)=>{setMovieGenres(event.target.value)}} placeholder="" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Select the new movie genres while pressing "Ctrl" button:
                        </Form.Label>
                        <Col sm="9">
                            <select multiple className="form-control" id="exampleFormControlSelect2">
                                {genres.length > 0 && genres.map(genre => (
                                    <option id={genre}>{genre}</option>
                                ))}
                            </select>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Runtime:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={runtime} onChange={(event)=>{setRuntime(event.target.value)}} placeholder="" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Main Actors:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={movieActors} onChange={(event)=>{setActors(event.target.value)}} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Main Actors Roles:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={actorsRoles} onChange={(event)=>{setActorsRoles(event.target.value)}}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Trailer ID:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={trailer} onChange={(event)=>{setTrailer(event.target.value)}} placeholder=""/>
                        </Col>

                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Poster:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose the movie poster.</Form.Label>
                                <Form.Control
                                    type="file"
                                    id="new-poster"
                                    accept="image/*"
                                    onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && file.type.substring(0,5) === "image") {
                                        setPoster(file);
                                    } else {
                                        setPoster(null);
                                    }
                                }
                                } />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img className="movie-poster" src={`/uploads/movie_images/cover/${posterImage}`} alt="movie-pos" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>



                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Background:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Choose the movie background.</Form.Label>
                                <Form.Control
                                    type="file"
                                    id="new-background"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        if (file && file.type.substring(0,5) === "image") {
                                            setBackground(file);
                                        } else {
                                            setBackground(null);
                                        }
                                    }
                                    } />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img className="movie-background" src={`/uploads/movie_images/background/${backgroundImage}`} alt="movie-bkg" className="img-thumbnail"></img>
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
                </Form>
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

export default EditMovie;


