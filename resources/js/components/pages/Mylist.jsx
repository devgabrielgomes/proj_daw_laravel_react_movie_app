import React, { useEffect, useState } from 'react';
import "../../../css/MyList.css";
import NavbarComponent from "../NavbarComponent"
import ListMovie from "../ListMovie"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LIST_MOVIES_API = `http://localhost:8000/api/my_list_items`
const REMOVE_LIST_API = `http://localhost:8000/api/my_list_items/remove/`

function Mylist() {
    const [listMovies, setListMovies] = useState([])
    const [showRemoveModal, setShowRemoveModal] = useState(false)
    const handleCloseRemoveModal = () => setShowRemoveModal(false);


    useEffect(() => {
        getListMovies(LIST_MOVIES_API)
    }, [])

    /**
     * GET request to get list movies data
     * @param LIST_MOVIES_API
     * @returns {Promise<void>}
     */
    async function getListMovies(LIST_MOVIES_API) {
        await fetch(LIST_MOVIES_API)
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

    /**
     * DELETE request to remove a specific movie from the list
     * @param id
     * @param title
     * @returns {Promise<void>}
     */
    const removeMovie = async (id, title) => {
        axios.delete(REMOVE_LIST_API + id)
            .then(() => {
                getListMovies(LIST_MOVIES_API)
                handleCloseRemoveModal()
                toastSuccess(`You just removed "${title}" from your list!`)
            })
            .catch(({response})=>{
                toastError(`Unable to remove "${title}" from your list!`)
            })
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
                                    <ListMovie movie={movie} key={"list_movie_" + movie.id} removeMovie={removeMovie}/>
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
