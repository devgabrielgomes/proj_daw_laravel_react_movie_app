import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/AddMovie.css";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {parseInt} from "lodash";

function AddMovie() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [allGenres, setAllGenres] = useState([]);
    const [allActors, setAllActors] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState("");
    const [runtime, setRuntime] = useState("");
    const [trailer, setTrailer] = useState("");
    const [genres, setSelectedOptionsGenres] = useState([]);
    const [actors, setSelectedOptionsActors] = useState([]);

    const MOVIE_API = `http://localhost:8000/api/movies/get_movie_id/`
    const GENRE_API = `http://localhost:8000/api/genres/`
    const MOVIE_GENRE_API = `http://localhost:8000/api/movie_genres`
    const ROLE_API = `http://localhost:8000/api/roles`
    const ACTOR_API = `http://localhost:8000/api/actors`
    const ADD_MOVIE_API = `http://localhost:8000/api/movies/add`
    const ADD_ROLES_API = "http://localhost:8000/api/roles/add"
    const ADD_MOVIE_GENRE_API = "http://localhost:8000/api/movie_genres/add"
    const ADD_MOVIE_IMAGES_API = "http://localhost:8000/api/movie_images/add/"

    const [cover, setCover] = useState({});
    const uploadCover = (e) => {
        setCover({
            coverPreview : URL.createObjectURL(e.target.files[0]),
            coverAsFile : e.target.files[0]
        })
    }

    const [background, setBackground] = useState({});
    const uploadBackground = (e) => {
        setBackground({
            backgroundPreview : URL.createObjectURL(e.target.files[0]),
            backgroundAsFile : e.target.files[0]
        })
    }

    useEffect(() => {
        getGenresData(GENRE_API)
        getActorsData(ACTOR_API)
    }, [])


    /**
     * Handle the genres changes
     * @param e
     */
    const changeHandlerGenres = (e) => {
        let selected_genres = Array.from(e.target.selectedOptions, option => parseInt(option.value));

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
     * Execute all the post requests needed to add a movie to the system
     * @param e
     * @returns {Promise<void>}
     */
    const postForm = async (e) => {
        e.preventDefault()
        await postMovie()
        navigate("/management")
    }

    /**
     * POST request to add new movie
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postMovie = async (e) => {
        let movieData = {'title': title, 'year': year, 'rating': rating, 'synopsis': synopsis, 'trailer': trailer, 'runtime': runtime}
        const movieGenresFormData = new FormData()
        const movieRolesFormData = new FormData()
        const movieImagesFormData = new FormData()
        axios.post(ADD_MOVIE_API, movieData)
            .then(() => axios.get(MOVIE_API + title))
                .then((res) => {
                    const movieID = res.data[0].id;

                    //Movie genres data
                    movieGenresFormData.append('fk_id_movie', movieID)
                    for (let i = 0; i < genres.length; i++) {
                        movieGenresFormData.append('genres[]', genres[i]);
                    }

                    //Movie roles data
                    let roles = selectedRoles.split(',');
                    movieRolesFormData.append('fk_id_movie', movieID)
                    for (let i = 0; i < actors.length; i++) {
                        movieRolesFormData.append('actors[]', actors[i]);
                    }
                    for (let i = 0; i < roles.length; i++) {
                        movieRolesFormData.append('roles[]', roles[i]);
                    }

                    //Movie images data
                    movieImagesFormData.append('fk_id_movie', movieID)
                    movieImagesFormData.append('cover', cover.coverAsFile)
                    movieImagesFormData.append('background', background.backgroundAsFile)
                })
            .then(() => axios.post(ADD_MOVIE_GENRE_API, movieGenresFormData))
            .then(() => axios.post(ADD_ROLES_API, movieRolesFormData))
            .then(() => axios.post(ADD_MOVIE_IMAGES_API, movieImagesFormData, {
                headers: {"Content-Type": "multipart/form-data"}}))
            .then(async () => {
                toastSuccess(`You just added "${title}" to your system!`);
                await wait(3500)
            })
            .catch(async ({response}) => {
                toastError(`Unable to remove "${title}" from your system!`)
                await wait(3500)
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
     * GET request to set actors data
     * @async
     * @param ACTOR_API
     * @returns {Promise<void>}
     */
    async function getActorsData(ACTOR_API) {
        await fetch(ACTOR_API)
            .then(res => res.json())
            .then(data => {
                var actors_name = [];
                for (let i = 0; i < data.data.length; i++) {
                    actors_name.push(data.data[i].id + " - " + data.data[i].name)
                }
                setAllActors(actors_name)
            })
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
                <Row>
                    <Col sm="3">
                        <Link to="/management">
                        <Button className="back-button" variant="secondary">
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </Button>{' '}
                        </Link>
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
                            Select the movie genres while pressing "Ctrl" button:<br></br>
                            <b>Current movie genres IDs by order -> {genres.join(', ')}</b>
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
                            <b>Current movie actors IDs by order -> {actors.join(', ')}</b>
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
                            Movie roles by actors order:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={selectedRoles} onChange={(event)=>{setSelectedRoles(event.target.value)}} rows={2} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Trailer ID:
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" value={trailer} onChange={(event)=>{setTrailer(event.target.value)}} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Cover:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
                                <Form.Control type="file" accept="image/*" name="cover" className="form-control" id="cover" onChange={uploadCover}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img name="movie-cover" src={cover.coverPreview} alt="movie-pos" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Background:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
                                <Form.Control type="file" accept="image/*" name="background" className="form-control" id="background" onChange={uploadBackground}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img name="movie-background" src={background.backgroundPreview} alt="movie-bkg" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <div className="flex-parent jc-center">
                        <Button className="save-button" variant="primary" type="submit" onClick={postForm}>
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


