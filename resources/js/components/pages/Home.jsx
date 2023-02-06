import React, { useEffect, useState } from 'react';
import "../../../css/Home.css";
import Movie from "../Movie"
import MovieInfo from "./MovieInfo"
import NavbarComponent from "../NavbarComponent"
import "bootstrap/dist/css/bootstrap.min.css"
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3bf31c72f99e4189266c43358ac6e189&page=1`
const FEATURED_API = `http://127.0.0.1:8000/api/v1/movies?page=1`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=3bf31c72f99e4189266c43358ac6e189&language=en-US&page=1&include_adult=false&query=`

const Home = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getMovies(FEATURED_API)
    }, [])

    async function getMovies(API) {
        await fetch(API)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.data.length > 0) {
                    setMovies(data.data)
                } else {
                    toast.error(`The movie that you searched doesn't exists in our system!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (searchTerm) {
            getMovies(SEARCH_API + searchTerm)
            setSearchTerm("")
        }
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <motion.div
                className='Home'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
                <NavbarComponent />
                <div className="welcome--text">
                    <h1>Get all the information about movies.</h1>
                </div>

                <form className="search--bar" onSubmit={handleOnSubmit}>
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="Search a movie... "
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                </form>
                <div
                    className="movie--container"
                    whiletap={{ scale: 0.9 }}
                >
                    {movies.length > 0 && movies.map(movie => (
                        <Movie key={movie.id} movie={movie} />
                    ))}
                </div>
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

export default Home;
