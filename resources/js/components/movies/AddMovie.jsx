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
    const [nextMovieID, setNextMovieID] = useState("")
    const [nextMovieGenreID, setNextMovieGenreID] = useState("")
    const [nextRoleID, setNextRoleID] = useState("")
    const [nextMovieImageID, setNextMovieImageID] = useState("")
    const [title, setTitle] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [allGenres, setAllGenres] = useState([]);
    const [allActors, setAllActors] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState("");
    const [allActorsPhotos, setAllActorsPhotos] = useState([]);

    const [runtime, setRuntime] = useState("");
    const [actorsRoles, setActorsRoles] = useState("");
    const [trailer, setTrailer] = useState("");

    const [cover, setCover] = useState();
    const [background, setBackground] = useState();

    const [genres, setSelectedOptionsGenres] = useState([]);
    const [actors, setSelectedOptionsActors] = useState([]);
    // const [actorsImages, setSelectedOptionsActorsImages] = useState([]);

    // const [coverImage, setCoverImage] = useState();
    // const [backgroundImage, setBackgroundImage] = useState();
    const MOVIE_API = `http://localhost:8000/api/movies`
    const GENRE_API = `http://localhost:8000/api/genres/`
    const MOVIE_GENRE_API = `http://localhost:8000/api/movie_genres`
    const ROLE_API = `http://localhost:8000/api/roles`
    const MOVIE_IMAGES_API = `http://localhost:8000/api/movie_images`
    const ADD_MOVIE_API = `http://localhost:8000/api/movies/add`
    const ADD_ROLES_API = "http://localhost:8000/api/roles/add"
    const ADD_MOVIE_GENRE_API = "http://localhost:8000/api/movie_genres/add"
    const ADD_MOVIE_IMAGES_API = "http://localhost:8000/api/movie_images/add/"

    useEffect(() => {
        getNextMovieID(MOVIE_API)
        getGenresData(GENRE_API)
        getRolesData(ROLE_API)
        getNextMovieGenreID(MOVIE_GENRE_API)
        getNextRoleID(ROLE_API)
        getNextImageID(MOVIE_IMAGES_API)
    }, [])

    /**
     * Handle the cover change
     * @param e
     */
    const changeHandlerCover = (e) => {
        let file = e.target.files[0]
        let cover_reader = new FileReader()
        cover_reader.onloadend = (file) => {
            setCover(cover_reader.result)
        }
        cover_reader.readAsDataURL(file)
    }

    /**
     * Handle the background change
     * @param e
     */
    const changeHandlerBackground = (e) => {
        let file = e.target.files[0]
        let background_reader = new FileReader()
        background_reader.onloadend = (file) => {
            setBackground(background_reader.result)
        }
        background_reader.readAsDataURL(file)
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
     * Execute all the post needed to add a movie to the system
     * @param e
     * @returns {Promise<void>}
     */
    const postForm = async (e) => {
        e.preventDefault()
        await postMovie()
        await postMovieGenres()
        await postMovieRoles()
        //await postMovieImages()

        await wait(3500)
        navigate("/management")
    }

    /**
     * POST request to add new movie
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postMovie = async (e) => {
        const movieFormData = new FormData()
        movieFormData.append('id', nextMovieID)
        movieFormData.append('title', title)
        movieFormData.append('year', year)
        movieFormData.append('rating', rating)
        movieFormData.append('synopsis', synopsis)
        movieFormData.append('trailer', trailer)
        movieFormData.append('runtime', runtime)

        await axios.post(ADD_MOVIE_API, movieFormData)
            .then(() => {
                toastSuccess(`Movie added successfully!`)
            })
            .catch(({response})=>{
                toastError("Unable to add movie! Check movie parameters.")
            })
    }

    /**
     * POST request to add the new movie genres
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postMovieGenres = async (e) => {
        const movieGenresFormData = new FormData()

        movieGenresFormData.append('id', nextMovieGenreID)
        movieGenresFormData.append('fk_id_movie', nextMovieID)
        for (var i = 0; i < genres.length; i++) {
            movieGenresFormData.append('genres[]', genres[i]);
        }

        await axios.post(ADD_MOVIE_GENRE_API, movieGenresFormData)
            .then(() => {
                toastError(`Movie genres added successfully!`)
            })
            .catch(({response})=>{
                toastError("Unable to add movie genres! Check movie parameters.")
            })
    }

    /**
     * POST request to add the new movie roles
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postMovieRoles = async (e) => {
        let roles = selectedRoles.split(',');
        const rolesFormData = new FormData()
        rolesFormData.append('id', nextRoleID)
        rolesFormData.append('fk_id_movie', nextMovieID)
        for (var i = 0; i < actors.length; i++) {
            rolesFormData.append('actors[]', actors[i]);
        }
        for (var i = 0; i < roles.length; i++) {
            rolesFormData.append('roles[]', roles[i]);
        }

        await axios.post(ADD_ROLES_API, rolesFormData)
            .then(() => {
                toastSuccess(`Movie roles added successfully!`)
            })
            .catch(({response})=>{
                toastError("Unable to add movies roles! Check movie parameters.")
            })
    }

    /**
     * POST request to add the new movie images
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postMovieImages = async (e) => {
        const movieImagesFormData = new FormData()
        movieImagesFormData.append('id', nextMovieImageID)
        movieImagesFormData.append('fk_id_movie', nextMovieID)
        movieImagesFormData.append('cover', cover)
        movieImagesFormData.append('background', background)

        await axios.post(ADD_MOVIE_IMAGES_API, movieImagesFormData)
            .then(() => {
                toastSuccess(`Images added successfully!`)
            })
            .catch(({response})=>{
                toastError(`Unable to add movie images! Check image parameters.`)
            })
    }

    /**
     * GET request to set next movie ID
     * @async
     * @param MOVIE_API
     * @returns {Promise<void>}
     */
    async function getNextMovieID(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                setNextMovieID(data.length + 1)
            })
    }

    /**
     * GET request to set next movie genre ID
     * @async
     * @param MOVIE_GENRE_API
     * @returns {Promise<void>}
     */
    async function getNextMovieGenreID(MOVIE_GENRE_API) {
        await fetch(MOVIE_GENRE_API)
            .then(res => res.json())
            .then(data => {
                setNextMovieGenreID(data.length + 1)
            })
    }

    /**
     * GET request to set next movie role ID
     * @async
     * @param ROLE_API
     * @returns {Promise<void>}
     */
    async function getNextRoleID(ROLE_API) {
        await fetch(ROLE_API)
            .then(res => res.json())
            .then(data => {
                setNextRoleID(data.length + 1)
            })
    }

    /**
     * GET request to set next movie image ID
     * @async
     * @param MOVIE_IMAGES_API
     * @returns {Promise<void>}
     */
    async function getNextImageID(MOVIE_IMAGES_API) {
        await fetch(MOVIE_IMAGES_API)
            .then(res => res.json())
            .then(data => {
                setNextMovieImageID(data.data.length + 1)
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
                setAllActorsPhotos(actor_pic)
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
                {/*<Form action="http://localhost:8000/api/movie_images/add_images/" id="image_form" method="POST" encType="multipart/form-data">*/}
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
                                <Form.Control type="file" name="cover" className="form-control" id="cover" onChange={changeHandlerCover}/>
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img name="movie-cover" src={cover} alt="movie-pos" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="3">
                            Background:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Group className="mb-3">
                                <Form.Control type="file" name="background" className="form-control" id="background" onChange={changeHandlerBackground} />
                            </Form.Group>
                        </Col>
                        <Col sm="2">
                            <img name="movie-background" src={background} alt="movie-bkg" className="img-thumbnail"></img>
                        </Col>
                    </Form.Group>

                    <div className="flex-parent jc-center">
                        <Button className="save-button" variant="primary" type="submit" onClick={postForm}>
                            <i className="far fa-save"></i> Save
                        </Button>{' '}
                    </div>
                {/*</Form>*/}
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


