<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMylistitemRequest;
use App\Http\Requests\UpdateMylistitemRequest;
use App\Http\Resources\V1\MylistitemCollection;
use App\Http\Resources\V1\MylistitemResource;
use App\Models\Mylistitem;

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
