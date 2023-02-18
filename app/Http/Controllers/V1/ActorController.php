<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\ActorFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActorRequest;
use App\Http\Requests\UpdateActorRequest;
use App\Http\Resources\V1\ActorCollection;
use App\Http\Resources\V1\ActorResource;
use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new ActorFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new ActorCollection(Actor::all());
        } else {
            $actors = Actor::where($filterItems)->paginate();

            return new ActorCollection($actors->appends($request->query()));
        }
    }

    public function addActor(Request $request)
    {
        $actor = new Actor();
        $actor->id = $request->id;
        $actor->name = $request->name;
        $actor->save();
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
     * @param  \App\Http\Requests\StoreActorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function show(Actor $actor)
    {
        return new ActorResource($actor);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function edit(Actor $actor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateActorRequest  $request
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActorRequest $request, Actor $actor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actor  $actor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actor $actor)
    {
        //
    }
}
