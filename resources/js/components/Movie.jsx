import React, { useEffect, useState } from 'react';
import "../../css/Movie.css";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import star from "./images/star.png";

const IMG_API = "https://image.tmdb.org/t/p/w1280"

const Movie = ({ movie: { id, title, name, poster_path, vote_average, release_date } }) => (
    <motion.div
        className="movie"
        whileTap={{ scale: 0.9 }}
    >
        <Link style={{ textDecoration: 'none', color: "white" }} to={`/movieinfo/${id}`}>
            <div>
                <img className="movie-poster" src={poster_path ? IMG_API + poster_path : "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"} alt="poster" />
                <div className="movie-info">
                    <h4>{title ? title : name}</h4>
                    <span>{release_date.substring(0, 4)}</span>
                </div>
                <div className="movie-over">
                    <div className="movie-rating">
                        <h2>{vote_average}</h2>
                        <img src={star} alt="star" />
                    </div>
                    <button type="button" className="btn btn-outline-primary">
                        <i className="fas fa-info-circle"></i> Show More Info
                    </button>
                </div>
            </div>
        </Link>
    </motion.div>
)

export default Movie
