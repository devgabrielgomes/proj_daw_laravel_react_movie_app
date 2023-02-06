<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMylistRequest;
use App\Http\Requests\UpdateMylistRequest;
use App\Http\Resources\V1\MylistCollection;
use App\Http\Resources\V1\MylistResource;
use App\Models\Mylist;

class MylistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new MylistCollection(Mylist::all());
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
     * @param  \App\Http\Requests\StoreMylistRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMylistRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Mylist  $mylist
     * @return \Illuminate\Http\Response
     */
    public function show(Mylist $mylist)
    {
        return new MylistResource($mylist);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Mylist  $mylist
     * @return \Illuminate\Http\Response
     */
    public function edit(Mylist $mylist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMylistRequest  $request
     * @param  \App\Models\Mylist  $mylist
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMylistRequest $request, Mylist $mylist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Mylist  $mylist
     * @return \Illuminate\Http\Response
     */
    public function destroy(Mylist $mylist)
    {
        //
    }
}
