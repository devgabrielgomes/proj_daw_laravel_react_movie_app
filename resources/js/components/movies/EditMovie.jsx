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

function EditMovie() {
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://127.0.0.1:8000/api/movies/${id}`
    const [movieInfo, setMovieInfo] = useState({})
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [genres, setGenres] = useState("");
    const [runtime, setRuntime] = useState("");
    const [actors, setActors] = useState("");
    const [actorsRoles, setActorsRoles] = useState("");
    const [trailer, setTrailer] = useState("");
    const [poster, setPoster] = useState();
    const [posterImage, setPosterImage] = useState();
    const [background, setBackground] = useState();
    const [backgroundImage, setBackgroundImage] = useState();


    useEffect(() => {
        getMovieData(MOVIE_API)

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
                setMovieInfo(data.data[0])
                setYear(data.data[0].year)
                setTitle(data.data[0].title)
                setDescription(data.data[0].description)
                setRating(data.data[0].rating)
                setRuntime(data.data[0].runtime)
                setTrailer(data.data[0].trailer)
                setPosterImage()
                setBackgroundImage()
                setGenres()
                setActors()
                setActorsRoles()


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
                            <Form.Control id="fee" type="text" value={title} onChange={(event)=>{setTitle(event.target.value)}} placeholder={`${movieInfo.title}`} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Movie Description:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={description} onChange={(event)=>{setDescription(event.target.value)}} rows={3} placeholder={`${movieInfo.synopsis}`} />
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
                            <Form.Control type="text" value={rating} onChange={(event)=>{setRating(event.target.value)}} placeholder={`${movieInfo.rating}`} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Genres:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={genres} onChange={(event)=>{setGenres(event.target.value)}} placeholder="" />
                        </Col>
                        <select multiple className="form-control" id="exampleFormControlSelect2">
                            {/*{*/}
                            {/*    moviesInList.length > 0*/}
                            {/*        ?*/}
                            {/*            <option>1</option>*/}
                            {/*        :*/}
                            {/*        <option>1</option>*/}
                            {/*}*/}
                        </select>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Runtime:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={runtime} onChange={(event)=>{setRuntime(event.target.value)}} placeholder={`${movieInfo.runtime}`} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Main Actors:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={actors} onChange={(event)=>{setActors(event.target.value)}} rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Main Actors Roles:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={actorsRoles} onChange={(event)=>{setActorsRoles(event.target.value)}} rows={3} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Trailer Link:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={trailer} onChange={(event)=>{setTrailer(event.target.value)}} rows={3} placeholder={`${movieInfo.trailer}`}/>
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
                            <img className="movie-poster" src={posterImage} alt="movie-pos" className="img-thumbnail"></img>
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
                            <img className="movie-background" src={backgroundImage} alt="movie-bkg" className="img-thumbnail"></img>
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


