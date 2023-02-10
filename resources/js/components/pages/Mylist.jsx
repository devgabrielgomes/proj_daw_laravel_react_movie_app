import React, { useEffect, useState } from 'react';
import "../../../css/MyList.css";
import NavbarComponent from "../NavbarComponent"
import ListMovie from "../ListMovie"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LIST_API = `http://127.0.0.1:8000/api/my_list_items`
const MOVIE_API = `http://127.0.0.1:8000/api/movies`
//const REMOVE_API = `https://api.themoviedb.org/3/list/8209568/remove_item?api_key=3bf31c72f99e4189266c43358ac6e189&session_id=b574b79cc4dbcadeead287a7fa1d15a82e54c305`


const Mylist = () => {
    const [listMoviesIds, setListMoviesIds] = useState([])
    const [movies, setMovies] = useState([])

    useEffect(() => {
        getListMoviesIds(LIST_API)
        getMovies(MOVIE_API)
    }, [])

    const getListMoviesIds = async () => {
        await fetch(LIST_API)
            .then(res => res.json())
            .then(data => {
                //console.log(data.data)
                if (!data.errors) {
                    let movies_list_ids = [];
                    for (let i = 0; i < data.data.length; i++) {
                        if(data.data[i].idMyList === 1) {
                            movies_list_ids[i] = data.data[i].idMovie
                        }
                    }
                    console.log("movies_list_ids:");
                    console.log(movies_list_ids);
                    setListMoviesIds(movies_list_ids)
                } else {
                    setListMoviesIds([])
                }
            });
    }

    async function getMovies(MOVIE_API) {
        await fetch(MOVIE_API)
            .then(res => res.json())
            .then(data => {
                // console.log("getMovies:")
                // console.log(data.data)
                setMovies(data.data)
            })
    }

    console.log(listMoviesIds)
    console.log(movies)

    let moviesInList = [];
    if (listMoviesIds.length > 0) {
        for (let m = 0; m < listMoviesIds.length; m++) {
            for (let n = 0; n < movies.length; n++) {
                if (listMoviesIds[m] == movies[n].id) {
                    moviesInList.push(movies[n])
                }
            }
            break
        }
        console.log("moviesInList:")
        console.log(moviesInList)
        // setMovies(all_movies)
    }

    // const removeMovie = async (movie_id, movie_title = "Movie") => {
    //     const data = { "media_id": movie_id };
    //
    //     await fetch(REMOVE_API, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log('Success:', data);
    //             setMovies(listMovies.filter(movie => movie.id !== movie_id))
    //             toast.error(`You just removed "${movie_title ? movie_title : "Gorr the God Butcher"}" from your list!`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             toast.error(`Error: ${error}`, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "dark",
    //             });
    //         });
    // }



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
                    moviesInList.length > 0
                        ?
                        <div className="movie-container">
                            {moviesInList.length > 0 && moviesInList.map(movie => (
                                <>
                                    {/*removeMovie={removeMovie}*/}
                                    <ListMovie key={movie.id} movie={movie} />
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
