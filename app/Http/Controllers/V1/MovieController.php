<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\V1\MovieResource;
use App\Http\Resources\V1\MovieCollection;
use App\Models\Movie;
use App\Filters\V1\MovieFilter;
use App\Models\Mylistitem;
use Illuminate\Http\Request;
//use App\Http\Requests\V1\StoreMovieRequest;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new MovieFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new MovieCollection(Movie::all());
        } else {
            $movies = Movie::where($filterItems)->paginate();

            return new MovieCollection($movies->appends($request->query()));
        }

    }

    public function getMovies()
    {
        $results = DB::table('movies')
            ->join('movie_images', 'movie_images.fk_id_movie', '=', 'movies.id')
            ->select('movies.*','movie_images.cover as cover', 'movie_images.background as background')
            ->get();

        return $results;
    }


    public function addMovie(Request $request)
    {
        $movie = new Movie();

        $movie->id = $request->id;
        $movie->title = $request->title;
        $movie->year = $request->year;
        $movie->rating = $request->rating;
        $movie->synopsis = $request->synopsis;
        $movie->trailer = $request->trailer;
        $movie->runtime = $request->runtime;
        $movie->save();
    }

    public function removeMovie($id)
    {
        $item = Movie::where('id', '=', $id);
        $item->delete();
    }

    public function searchMovie($term)
    {
        $searchValues = preg_split('/\s+/', $term, -1, PREG_SPLIT_NO_EMPTY);
        $final_term = "%";
        if ($searchValues > 1) {
            foreach ($searchValues as $elm) {
                $final_term = $final_term.$elm."%";
            }
        } else {
            $final_term = $term;
        }
        return Movie::where("title","like",$final_term)
            ->join('movie_images', 'movie_images.fk_id_movie', '=', 'movies.id')
                ->select('movies.*','movie_images.cover as cover', 'movie_images.background as background')
                ->get();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMovieRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMovieRequest $request)
    {
        return new MovieResource(Movie::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function show(Movie $movie)
    {
        return new MovieResource($movie);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMovieRequest  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMovieRequest $request, Movie $movie)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movie $movie)
    {
        //
    }
}
