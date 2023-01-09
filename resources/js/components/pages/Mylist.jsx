import React, { useEffect, useState } from 'react';
import "../../../css/MyList.css";
import NavbarComponent from "../NavbarComponent"
import ListMovie from "../ListMovie"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LIST_API = `https://api.themoviedb.org/3/list/8209568?api_key=3bf31c72f99e4189266c43358ac6e189`
const REMOVE_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`

const Mylist = () => {
    const [listMovies, setMovies] = useState([])

    useEffect(() => {
        getMovies(LIST_API)
    }, [])

    const getMovies = async () => {
        await fetch(LIST_API)
            .then(res => res.json())
            .then(data => {
                if (!data.errors) {
                    console.log(data);
                    setMovies(data.items)
                } else {
                    setMovies([])
                }
            });
    }

    const removeMovie = async (movie_id, movie_title = "Movie") => {
        const data = { "media_id": movie_id };

        await fetch(REMOVE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setMovies(listMovies.filter(movie => movie.id !== movie_id))
                toast.error(`You just removed "${movie_title ? movie_title : "Gorr the God Butcher"}" from your list!`, {
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
            .catch((error) => {
                console.error('Error:', error);
                toast.error(`Error: ${error}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
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
                                    <ListMovie key={movie.id} movie={movie} removeMovie={removeMovie} />
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
