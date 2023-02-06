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

class MoviegenreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new MoviegenreFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new MoviegenreCollection(Moviegenre::all());
        } else {
            $movie_genres = Moviegenre::where($filterItems)->paginate();

            return new MoviegenreCollection($movie_genres->appends($request->query()));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMoviegenreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMoviegenreRequest $request)
    {
        return new MoviegenreResource(Moviegenre::create($request->all()));
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
    public function destroy(Moviegenre $moviegenre)
    {
        //
    }
}
