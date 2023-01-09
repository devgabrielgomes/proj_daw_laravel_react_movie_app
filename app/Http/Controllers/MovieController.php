<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function add_movie(Request, $request) {
        $movie = new Movie();

        $movie->title = $request->title;
        $movie->year = $request->year;
        $movie->rating = $request->rating;
        $movie->genres = $request->genres;
        $movie->runtime = $request->runtime;
        $movie->actors = $request->actors;
        $movie->actorsRoles = $request->actorsRoles;
        $movie->trailer = $request->trailer;
        $movie->poster = $request->poster;
        $movie->posterImage = $request->posterImage;
        $movie->backgroundImage = $request->backgroundImage;
    }
}
