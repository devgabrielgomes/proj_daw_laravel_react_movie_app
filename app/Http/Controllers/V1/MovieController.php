<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\V1\MovieResource;
use App\Http\Resources\V1\MovieCollection;
use App\Models\Movie;
use App\Filters\V1\MovieFilter;
use Illuminate\Http\Request;
//use App\Http\Requests\V1\StoreMovieRequest;
use Illuminate\Support\Facades\DB;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Support\Collection
     */
    public function index()
    {
        $results = DB::table('movies')
            ->join('movie_images', 'movie_images.fk_id_movie', '=', 'movies.id')
            ->select('movies.*','movie_images.cover as cover', 'movie_images.background as background')
            ->get();
        return $results;
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Support\Collection
     */
    public function getMovieID($term)
    {
        return Movie::where("title","like",$term)
            ->get('movies.id');
    }

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Support\Collection
     */
    public function raw()
    {
        return Movie::all();
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $movie = new Movie();
        $movie->title = $request->title;
        $movie->year = $request->year;
        $movie->rating = $request->rating;
        $movie->synopsis = $request->synopsis;
        $movie->trailer = $request->trailer;
        $movie->runtime = $request->runtime;
        $movie->save();
    }

    /**
     * Display the specified resource.
     * @param $term
     * @return mixed
     */
    public function show($term)
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
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMovieRequest  $request
     * @param  \App\Models\Movie  $movie
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);
        $movie->title = $request->title;
        $movie->year = $request->year;
        $movie->rating = $request->rating;
        $movie->synopsis = $request->synopsis;
        $movie->trailer = $request->trailer;
        $movie->runtime = $request->runtime;
        $movie->save();
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     * @return void
     */
    public function destroy($id)
    {
        Movie::where('id', '=', $id)->delete();
    }
}
