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
    const ADD_GENRE_API = `http://localhost:8000/api/genres/add_genre`
    const ADD_ACTOR_API = `http://localhost:8000/api/actors/add_actor`

    useEffect(() => {
        getNextActorID(ACTOR_API)
        getNextGenreID(GENRE_API)
    }, [])

    function wait(ms) {
        return new Promise( (resolve) => {setTimeout(resolve, ms)});
    }

    const postActor = async (e) => {
        const actorFormData = new FormData()
        actorFormData.append('id', nextActorID)
        actorFormData.append('name', actorName)

        await axios.post(ADD_ACTOR_API, actorFormData)
            .then(async ({data}) => {
                toast.success(`Actor added successfully!`, {
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
                toast.error("Unable to add actor! Check actor parameters.", {
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

    const postGenre = async (e) => {
        const genreFormData = new FormData()
        genreFormData.append('id', nextGenreID)
        genreFormData.append('name', genreName)

        await axios.post(ADD_GENRE_API, genreFormData)
            .then(async ({data}) => {
                toast.success(`Genre added successfully!`, {
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
                toast.error("Unable to add genre! Check genre parameters.", {
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

    //Next Actor ID
    async function getNextActorID(ACTOR_API) {
        await fetch(ACTOR_API)
            .then(res => res.json())
            .then(data => {
                console.log("getNextActorID:")
                console.log(data.data.length + 1)
                setNextActorID(data.data.length + 1)
            })
    }

    //Next Genre Genre ID
    async function getNextGenreID(GENRE_API) {
        await fetch(GENRE_API)
            .then(res => res.json())
            .then(data => {
                console.log("getNextGenreGenreID:")
                console.log(data.data.length + 1)
                setNextGenreID(data.data.length + 1)
            })
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
                        Actor name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={actorName} onChange={(event)=>{setActorName(event.target.value)}}  />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                        Genre name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" value={genreName} onChange={(event)=>{setGenreName(event.target.value)}}  />
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


