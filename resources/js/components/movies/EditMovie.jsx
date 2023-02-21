import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/EditMovie.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {parseInt} from "lodash";

function EditMovie() {
    const navigate = useNavigate()
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://localhost:8000/api/movies`
    const MOVIE_GENRE_API = `http://localhost:8000/api/movie_genres/`
    const GENRE_API = `http://localhost:8000/api/genres/`
    const ROLE_API = `http://localhost:8000/api/roles`


    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");

    const [runtime, setRuntime] = useState("");
    const [trailer, setTrailer] = useState("");


    const [allGenres, setAllGenres] = useState([]);
    const [allActors, setAllActors] = useState([]);
    const [rolesText, setText] = useState("");
    const [genres, setSelectedOptionsGenres] = useState([]);
    const [actors, setSelectedOptionsActors] = useState([]);
    const [roles, setRoles] = useState([]);

    const [cover, setCover] = useState();
    const [coverImage, setCoverImage] = useState();
    const [background, setBackground] = useState();
    const [backgroundImage, setBackgroundImage] = useState();

    useEffect(() => {
        getMovieData(MOVIE_API)
        getGenresData(GENRE_API)
        getMovieGenresData(MOVIE_GENRE_API)
        getRolesData(ROLE_API)
        getMovieRolesData(ROLE_API)
    }, [])

    useEffect(() => {
            if (cover) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setCoverImage(reader.result);
                };
                reader.readAsDataURL(cover);
            } else {
                setCoverImage(null);
            }
        }, [cover]);

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
                setTitle(data[id - 1].title)
                setYear(data[id - 1].year)
                setSynopsis(data[id - 1].synopsis)
                setRating(data[id - 1].rating)
                setRuntime(data[id - 1].runtime)
                setTrailer(data[id - 1].trailer)
                setCoverImage(data[id - 1].cover)
                setBackgroundImage(data[id - 1].background)
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
                let all_genres = [];
                for (let i = 0; i < data.data.length; i++) {
                    all_genres[i] = data.data[i].id + " - " + data.data[i].name
                }
                setAllGenres(all_genres)
            })
    }

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
                    actors_name.push(data[i].id + " - " + data[i].actorName)
                    movie_roles.push(data[i].id + " - " + data[i].roleName)
                    actor_pic.push(data[i].actorPhoto)
                }
                setAllActors(actors_name)
                // setAllActorsPhotos(actor_pic)
            })
    }

    /**
     * GET request to set movie genres data
     * @async
     * @param MOVIE_GENRE_API
     * @returns {Promise<void>}
     */
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
                setSelectedOptionsGenres(movie_genres)
            })
    }

    /**
     * GET request to set movie roles data
     * @async
     * @param ROLE_API
     * @returns {Promise<void>}
     */
    async function getMovieRolesData(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                let movie_actors = [], movie_roles = [], actor_pic = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].idMovie === id) {
                        movie_actors.push(data[i].actorName)
                        movie_roles.push(data[i].roleName)
                        actor_pic.push(data[i].actorPhoto)
                    }
                }

                console.log("movie_actors:")
                console.log(movie_actors)
                console.log("movie_roles:")
                console.log(movie_roles)
                setSelectedOptionsActors(movie_actors)
                setSelectedOptionsRoles(movie_roles)
            })
    }


    //
    // function onCoverChange() {
    //     var newCover = document.getElementById("new-cover").value;
    //     console.log("newCover: ", newCover)
    // }

    const editMovie = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', title)
        formData.append('year', year)
        formData.append('synopsis', synopsis)
        formData.append('rating', rating)
        formData.append('genres', genres)
        formData.append('runtime', runtime)
        formData.append('actors', actors)
        formData.append('actorsRoles', actorsRoles)
        formData.append('trailer', trailer)

        await axios.post("/api/edit_movie/", formData)
            .then(() => {
                toastSuccess(`Movie edited successfully!`)
                wait(3500)
                navigate("/management")
            })
            .catch(({response})=>{
                toastError(`Unable to edit movie! Check the parameters.`)
            })
    }

    /**
     * Handle the genres changes
     * @param e
     */
    const changeHandlerGenres = (e) => {
        let selected_genres = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        console.log(selected_genres)
        setSelectedOptionsGenres(selected_genres);
    }

    /**
     * Handle the actors changes
     * @param e
     */
    const changeHandlerActors = (e) => {
        let selected_actors = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedOptionsActors(selected_actors);
    }

    /**
     * Handle the roles changes
     * @param e
     */
    const changeHandlerRoles = (e) => {
        let selected_roles = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        setSelectedOptionsRoles(selected_roles);
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
            <NavbarComponent />
            <div className="form-container">
                <Link to="/management">
                    <Button className="back-button" variant="secondary">
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </Button>{' '}
                </Link>
                <h2 className="page-title">Edit Movie</h2>
                <Form>
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
                            Select the movie genres while pressing "Ctrl" button:<br></br>
                            Current movie genres IDs by order -> <b>{genres.join(', ')}</b>
                        </Form.Label>
                        <Col sm="9">
                            <select name="selectOptions" multiple={true} onChange={changeHandlerGenres} id="multiple-selector">
                                {allGenres.length > 0 && allGenres.map(genre => (
                                    <option value={genre} id={genre}>{genre}</option>
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
                            Select four movie main actors while pressing "Ctrl" button:<br></br>
                            Current movie actors IDs by order -> <b>{actors.join(', ')}</b>
                        </Form.Label>
                        <Col sm="9">
                            <select name="selectOptions" multiple="true" onChange={changeHandlerActors} id="multiple-selector">
                                {allActors.length > 0 && allActors.map(actor => (
                                    <option value={actor} id={actor}>{actor}</option>
                                ))}
                            </select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Current movie actors IDs by order -> <b>{roles.join(', ')}</b>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={year} onChange={(event)=>{setSelectedOptionsRoles(event.target.value)}}/>
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
                                <Form.Control
                                    type="file"
                                    id="new-cover"
                                    accept="image/*"
                                    onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file && file.type.substring(0,5) === "image") {
                                        setCover(file);
                                    } else {
                                        setCover(null);
                                    }
                                }
                                } />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img className="movie-cover" src={`/uploads/movie_images/cover/${coverImage}`} alt="movie-pos" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>



                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Background:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
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


