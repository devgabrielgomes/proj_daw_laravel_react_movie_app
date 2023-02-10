import React, { useEffect, useState } from 'react';
import "../../css/Movie.css";
import {Link, useParams} from 'react-router-dom';
import { motion } from "framer-motion";
import star from "./images/star.png";


function Movie({ movie: { id, title, year, rating, cover} }) {
    // const IMAGE_API = `http://127.0.0.1:8000/api/movie_images?id[eq]=${id}`
    // const [coverData, setCoverData] = useState([])

    // useEffect(() => {
    //     getMovieCover(IMAGE_API)
    // }, [])

    // //Image Data
    // async function getMovieCover(MOVIE_API) {
    //     await fetch(MOVIE_API)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCoverData(data.data[0].cover)
    //         })
    // }

    return (
        <>
            <motion.div
                className="movie"
                whileTap={{scale: 0.9}}
            >
                <Link style={{textDecoration: 'none', color: "white"}} to={`/movieinfo/${id}`}>
                    <div>
                        <img className="movie-poster" src={`/uploads/movie_images/cover/${cover}`} alt="poster"/>
                        <div className="movie-info">
                            <h4>{title}</h4>
                            <span>{year}</span>
                        </div>
                        <div className="movie-over">
                            <div className="movie-rating">
                                <h2>{rating}</h2>
                                <img src={star} alt="star"/>
                            </div>
                            <button type="button" className="btn btn-outline-primary">
                                <i className="fas fa-info-circle"></i> Show More Info
                            </button>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </>
    )
}

export default Movie
