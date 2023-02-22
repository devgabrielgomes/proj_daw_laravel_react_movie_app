<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\GenreFilter;
use App\Filters\V1\MoviegenreFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMoviegenreRequest;
use App\Http\Requests\UpdateMoviegenreRequest;
use App\Http\Resources\V1\MoviegenreCollection;
use App\Http\Resources\V1\MoviegenreResource;
use App\Models\Moviegenre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MoviegenreController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Support\Collection
     */
    public function index()
    {
        $result = DB::table('movie_genres')
            ->join('genres', 'movie_genres.fk_id_genre', '=', 'genres.id')
            ->select('movie_genres.id', 'movie_genres.fk_id_movie as idMovie', 'genres.*')
            ->get();

        return $result;
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $movie_genre = Moviegenre::all()->last();
        $id = $movie_genre->id + 1;
        $fk_id_movie = $request->fk_id_movie;
        $movie_genres = $request->genres;

        for($i=0; $i<count($movie_genres); $i++){
            $datasave = [
                'id' => $id + $i,
                'fk_id_movie' => $fk_id_movie,
                'fk_id_genre' => $movie_genres[$i],
            ];
            DB::table('movie_genres')->insert($datasave);
        }
    }


    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        Moviegenre::where('fk_id_movie', '=', $id)->delete();
        $movie_genre = Moviegenre::all()->last();
        $id = $movie_genre->id + 1;
        $fk_id_movie = $request->fk_id_movie;
        $movie_genres = $request->genres;

        for($i=0; $i<count($movie_genres); $i++){
            $datasave = [
                'id' => $id + $i,
                'fk_id_movie' => $fk_id_movie,
                'fk_id_genre' => $movie_genres[$i],
            ];
            DB::table('movie_genres')->insert($datasave);
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     * @return void
     */

    public function destroy($id)
    {
        Moviegenre::where('fk_id_movie', '=', $id)->delete();
    }
}
