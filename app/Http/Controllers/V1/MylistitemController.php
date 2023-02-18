<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMylistitemRequest;
use App\Http\Requests\UpdateMylistitemRequest;
use App\Http\Resources\V1\MylistitemCollection;
use App\Http\Resources\V1\MylistitemResource;
use App\Models\Mylistitem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MylistitemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new MylistitemCollection(Mylistitem::all());
    }

    public function getListItems()
    {
        $result = DB::table('my_list_items')
            ->join('movies', 'movies.id', '=', 'my_list_items.fk_id_movie')
            ->join('my_lists', 'my_lists.id', '=', 'my_list_items.fk_id_my_list')
            ->select('my_list_items.id', 'my_list_items.fk_id_movie as idMovie', 'my_list_items.fk_id_my_list as idMyList')
            ->get();
        return $result;
    }

    public function getListMovies()
    {
        $results = DB::table('my_list_items')
            ->join('movie_images', 'my_list_items.fk_id_movie', '=', 'movie_images.id')
            ->join('movies', 'my_list_items.fk_id_movie', '=', 'movies.id')
            ->select('movies.*', 'movie_images.cover as cover', 'movie_images.background as background')
            ->get();

        return $results;
    }

    public function addMyListItem(Request $request) {
        $my_list_item = new Mylistitem();

        $my_list_item->id = $request->id;
        $my_list_item->fk_id_movie = $request->fk_id_movie;
        $my_list_item->fk_id_my_list = $request->fk_id_my_list;
        $my_list_item->save();
    }

    public function removeMyListItem($id) {
        $item = Mylistitem::where('fk_id_movie', '=', $id);
        $item->delete();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMylistitemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMylistitemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mylistitem  $mylistitem
     * @return \Illuminate\Http\Response
     */
    public function show(Mylistitem $mylistitem)
    {
        return new MylistitemResource($mylistitem);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mylistitem  $mylistitem
     * @return \Illuminate\Http\Response
     */
    public function edit(Mylistitem $mylistitem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMylistitemRequest  $request
     * @param  \App\Models\Mylistitem  $mylistitem
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMylistitemRequest $request, Mylistitem $mylistitem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mylistitem  $mylistitem
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mylistitem $mylistitem)
    {
        //
    }
}
