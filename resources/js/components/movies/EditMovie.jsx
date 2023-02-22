import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/EditMovie.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {parseInt} from "lodash";
import {value} from "lodash/seq";

function EditMovie() {
    const navigate = useNavigate()
    let params = useParams();
    let id = params.id
    const MOVIE_API = `http://localhost:8000/api/movies`
    const MOVIE_GENRE_API = `http://localhost:8000/api/movie_genres/`
    const GENRE_API = `http://localhost:8000/api/genres/`
    const ROLE_API = `http://localhost:8000/api/roles`
    const EDIT_MOVIE_API = `http://localhost:8000/api/movies/edit/`
    const EDIT_MOVIE_GENRES_API = `http://localhost:8000/api/movie_genres/edit/`
    const EDIT_ROLES_API = `http://localhost:8000/api/roles/edit/`
    const EDIT_MOVIE_IMAGES_API = `http://localhost:8000/api/movie_images/edit/`
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [runtime, setRuntime] = useState("");
    const [trailer, setTrailer] = useState("");
    const [allGenres, setAllGenres] = useState([]);
    const [allActors, setAllActors] = useState([]);
    const [genres, setSelectedOptionsGenres] = useState([]);
    const [actors, setSelectedOptionsActors] = useState([]);
    const [roles, setSelectedOptionsRoles] = useState([]);
    const [currentCover, setCurrentCover] = useState("");
    const [currentBackground, setCurrentBackground] = useState("");

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
        getMovieData(MOVIE_API)
        getGenresData(GENRE_API)
        getMovieGenresData(MOVIE_GENRE_API)
        getRolesData(ROLE_API)
        getMovieRolesData(ROLE_API)
    }, [])

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
                console.log(data)
                data.forEach(element => {
                    if(element.id == id) {
                        setTitle(element.title)
                        setYear(element.year)
                        setSynopsis(element.synopsis)
                        setRating(element.rating)
                        setRuntime(element.runtime)
                        setTrailer(element.trailer)
                        setCurrentCover(element.cover)
                        setCurrentBackground(element.background)
                    }
                });
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
                var actors_name = [], movie_roles = [];
                for (let i = 0; i < data.length; i++) {
                    actors_name.push(data[i].id + " - " + data[i].actorName)
                    movie_roles.push(data[i].id + " - " + data[i].roleName)
                }
                setAllActors(actors_name)
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
                        movie_genres.push(data[i].id)
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
                var movie_actors = [], movie_roles = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].idMovie == id) {
                        movie_actors.push(data[i].actorName)
                        movie_roles.push(data[i].roleName)
                    }
                }
                setSelectedOptionsActors(movie_actors)
                setSelectedOptionsRoles(movie_roles)
            })
    }

    /**
     * Execute all the put requests needed to edit a movie in the system
     * @param e
     * @returns {Promise<void>}
     */
    const postForm = async (e) => {
        e.preventDefault()
        await editMovie()
        navigate("/management")
    }

    const editMovie = async (e) => {
        let movieData = {'title': title, 'year': year, 'rating': rating, 'synopsis': synopsis, 'trailer': trailer, 'runtime': runtime}
        const movieGenresFormData = new FormData()
        const movieRolesFormData = new FormData()
        const movieImagesFormData = new FormData()
        axios.put(EDIT_MOVIE_API + id, movieData)
            .then(() => {
                //Movie genres data
                movieGenresFormData.append('fk_id_movie', id)
                for (let i = 0; i < genres.length; i++) {
                    movieGenresFormData.append('genres[]', genres[i]);
                }

                //Movie roles data
                console.log("actors:")
                console.log(actors)
                movieRolesFormData.append('fk_id_movie', id)
                for (let i = 0; i < actors.length; i++) {
                    movieRolesFormData.append('actors[]', actors[i]);
                }
                console.log("roles:")
                console.log(roles)
                for (let i = 0; i < roles.length; i++) {
                    movieRolesFormData.append('roles[]', roles[i]);
                }

                //Movie images data
                movieImagesFormData.append('fk_id_movie', id)
                movieImagesFormData.append('cover', cover.coverAsFile)
                movieImagesFormData.append('background', background.backgroundAsFile)
            })
            .then(() => axios.post(EDIT_MOVIE_GENRES_API + id, movieGenresFormData))
            .then(() => axios.post(EDIT_ROLES_API + id, movieRolesFormData))
            .then(() => axios.post(EDIT_MOVIE_IMAGES_API + id, movieImagesFormData, {
                headers: {"Content-Type": "multipart/form-data"}}))
            .then(async () => {
                toastSuccess(`Movie "${title}" edit successfully!`);
                await wait(3500)
            })
            .catch(async ({response}) => {
                toastError(`Unable to edit movie "${title}"!`)
                await wait(3500)
            })
    }

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
     * Handle the roles changes
     * @param e
     */
    const changeHandlerRoles = (e) => {
        let selected_roles = e.target.value.split(',');
        console.log(selected_roles)
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
                            Current movie roles IDs by actor order -> <b>{roles.join(', ')}</b>
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="textarea" value={roles} onChange={changeHandlerRoles} rows={2}/>
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
                                <Form.Control type="file" accept="image/*" name="cover" className="form-control" id="cover" onChange={uploadCover}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img name="movie-cover" src={cover.coverPreview ? cover.coverPreview : `/uploads/movie_images/cover/${currentCover}`} alt="movie-pos" className="img-thumbnail"></img>
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
                            <img name="movie-background" src={background.backgroundPreview ? background.backgroundPreview : `/uploads/movie_images/background/${currentBackground}`}alt="movie-bkg" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <div className="flex-parent jc-center">
                        <Button className="save-button" variant="primary" type="submit" onClick={postForm}>
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


