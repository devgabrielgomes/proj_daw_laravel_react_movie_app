import React, {useEffect, useState} from "react";
import NavbarComponent from "../NavbarComponent";
import {Button, Form, Row, Col} from "react-bootstrap";
import "../../../css/AddActorOrGenre.css";
import {Link, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddMovie() {
    const navigate = useNavigate()
    const [nextActorID, setNextActorID] = useState("")
    const [nextGenreID, setNextGenreID] = useState("")
    const [genreName, setGenreName] = useState("");
    const [actorName, setActorName] = useState("");

    const GENRE_API = `http://localhost:8000/api/genres`
    const ACTOR_API = `http://localhost:8000/api/actors`
    const ADD_GENRE_API = `http://localhost:8000/api/genres/add`
    const ADD_ACTOR_API = `http://localhost:8000/api/actors/add`
    const ADD_ACTOR_IMAGE_API = `http://localhost:8000/api/actor_image/add`

    const [actorPhoto, setActorPhoto] = useState({});
    const uploadActorPhoto = (e) => {
        setActorPhoto({
            actorPhotoPreview : URL.createObjectURL(e.target.files[0]),
            actorPhotoAsFile : e.target.files[0]
        })
    }

    /**
     * POST request to add new actor
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postActor = async (e) => {
        const actorFormData = new FormData()
        actorFormData.append('name', actorName)

        axios.post(ADD_ACTOR_API, actorFormData)
            .then(async () => {
                toastSuccess(`Actor added successfully!`)
            })
            .then(() => axios.get(ACTOR_API))
                .then((res) => {
                    const nextActorID = res.data.data[res.data.data.length - 1].id;
                    const actorPhotoFormData = new FormData()
                    actorPhotoFormData.append('fk_id_actor', nextActorID)
                    actorPhotoFormData.append('photo', actorPhoto.actorPhotoAsFile)

                    axios.post(ADD_ACTOR_IMAGE_API, actorPhotoFormData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                        .then(() => {
                            toastSuccess(`Actor image added successfully!`)
                        })
                        .catch(({response}) => {
                            toastError(`Unable to add actor image! Check image parameters.`)
                        })
                })
        await wait(3500)
        navigate("/management")
    }

    /**
     * POST request to add new genre
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postGenre = async (e) => {
        const genreFormData = new FormData()
        genreFormData.append('name', genreName)

        await axios.post(ADD_GENRE_API, genreFormData)
            .then(async () => {
                toastSuccess(`Genre added successfully!`)
                await wait(3500)
                navigate("/management")
            })
            .catch(({response})=>{
                toastError("Unable to add genre! Check genre parameters.")
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
                        <h2 className="page-title">Add Actor or Genre</h2>
                    </Col>
                </Row>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Genre name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={genreName} onChange={(event)=>{setGenreName(event.target.value)}}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Actor name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={actorName} onChange={(event)=>{setActorName(event.target.value)}}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Actor Photo:
                    </Form.Label>
                    <Col sm="7">
                        <Form.Group className="mb-3">
                            <Form.Control type="file" name="cover" className="form-control" id="cover" onChange={uploadActorPhoto}/>
                        </Form.Group>
                    </Col>
                    <Col sm="2">
                        <img name="movie-cover" src={actorPhoto.actorPhotoPreview} alt="movie-pos" className="img-thumbnail"></img>
                    </Col>
                </Form.Group>

                <div className="flex-parent jc-center">
                    <Button className="add-actor-button" variant="primary" type="submit" onClick={postActor}>
                        <i className="far fa-save"></i> Add actor
                    </Button>{' '}

                    <Button className="add-genre-button" variant="info" type="submit" onClick={postGenre}>
                        <i className="far fa-save"></i> Add genre
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


