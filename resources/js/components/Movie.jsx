import React, { useEffect, useState } from 'react';
import "../../css/Movie.css";
import {Link} from 'react-router-dom';
import { motion } from "framer-motion";
import star from "./images/star.png";


function Movie({ movie: { id, title, year, rating, cover} }) {
    return (
        <>
            <motion.div
                className="movie"
                whileTap={{scale: 0.9}}
            >
                <Link style={{textDecoration: 'none', color: "white"}} to={`/movie_info/${id}`}>
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
