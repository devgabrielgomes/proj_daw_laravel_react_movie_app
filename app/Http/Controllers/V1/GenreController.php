<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\GenreFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenreRequest;
use App\Http\Requests\UpdateGenreRequest;
use App\Http\Resources\V1\GenreCollection;
use App\Http\Resources\V1\GenreResource;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new GenreFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new GenreCollection(Genre::all());
        } else {
            $genres = Genre::where($filterItems)->paginate();

            return new GenreCollection($genres->appends($request->query()));
        }
    }

    public function addGenre(Request $request)
    {
        $genre = new Genre();
        $genre->id = $request->id;
        $genre->name = $request->name;
        $genre->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreGenreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreGenreRequest $request)
    {
        return new GenreResource(Genre::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function show(Genre $genre)
    {
        return new GenreResource($genre);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateGenreRequest  $request
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateGenreRequest $request, Genre $genre)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Genre  $genre
     * @return \Illuminate\Http\Response
     */
    public function destroy(Genre $genre)
    {
        //
    }
}
