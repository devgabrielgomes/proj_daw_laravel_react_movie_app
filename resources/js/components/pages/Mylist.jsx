import React, { useEffect, useState } from 'react';
import "../../../css/MyList.css";
import NavbarComponent from "../NavbarComponent"
import ListMovie from "../ListMovie"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Movie from "@/components/Movie";

const GET_LIST_MOVIES_API = `http://127.0.0.1:8000/api/get_list_movies`
const REMOVE_LIST_API = `http://127.0.0.1:8000/api/my_list_items/remove_movie/`


function Mylist() {
    const [listMovies, setListMovies] = useState([])
    const [show, setShow] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);
    const handleShowRemoveModal = () => setShowRemoveModal(true);


    useEffect(() => {
        getListMovies(GET_LIST_MOVIES_API)
    }, [])

    async function getListMovies(GET_LIST_MOVIES_API) {
        await fetch(GET_LIST_MOVIES_API)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    console.log(data)
                    setListMovies(data)
                } else {
                    setListMovies([])
                }
            });
    }

    const removeMovie = async (id, title) => {
        axios.delete(REMOVE_LIST_API + id)
            .then(() => {
                getListMovies(GET_LIST_MOVIES_API)
                handleCloseRemoveModal()
                toast.error(`You just removed "${title}" from your list!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                <NavbarComponent />
                <div className="title-mylist">
                    <h1>My list</h1>
                </div>


                {
                    listMovies.length > 0
                        ?
                        <div className="movie-container">
                            {listMovies.length > 0 && listMovies.map(movie => (
                                <>
                                    <ListMovie movie={movie} key={movie.id} removeMovie={removeMovie}/>
                                </>
                            ))}
                        </div>
                        :
                        <h1 className="no-movies">You don't have any movies in your list!</h1>
                }


            </motion.div>
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
    )

}

export default Mylist
