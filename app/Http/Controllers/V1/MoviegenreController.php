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
        $id = $request->id;
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
     * Display the specified resource.
     *
     * @param  \App\Models\Moviegenre  $moviegenre
     * @return \Illuminate\Http\Response
     */
    public function show(Moviegenre $moviegenre)
    {
        return new MoviegenreResource($moviegenre);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMoviegenreRequest  $request
     * @param  \App\Models\Moviegenre  $moviegenre
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMoviegenreRequest $request, Moviegenre $moviegenre)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Moviegenre  $moviegenre
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Moviegenre::where('fk_id_movie', '=', $id)->delete();
    }
}
