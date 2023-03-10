<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\ActorimageFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreActorimageRequest;
use App\Http\Requests\UpdateActorimageRequest;
use App\Http\Resources\V1\ActorimageCollection;
use App\Http\Resources\V1\ActorimageResource;
use App\Models\Actorimage;
use Illuminate\Http\Request;

class ActorimageController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return ActorimageCollection
     */
    public function index(Request $request)
    {
        $filter = new ActorimageFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new ActorimageCollection(Actorimage::all());
        } else {
            $actor_image = Actorimage::where($filterItems)->paginate();
            return new ActorimageCollection($actor_image->appends($request->query()));
        }
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        $actor_image = new Actorimage();

        $actor_image->fk_id_actor = $request->fk_id_actor;
        if($request->photo != "") {
            $img = $request->file('photo');
            $extension = $img->getClientOriginalExtension();
            $filename = "actor_".$request->fk_id_actor.".".$extension;
            $upload_path = "uploads/actor_images/";

            $img->move($upload_path, $filename);
            $actor_image->photo = $filename;
        }
        $actor_image->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Actorimage  $actorimage
     * @return \Illuminate\Http\Response
     */
    public function show(Actorimage $actorimage)
    {
        return new ActorimageResource($actorimage);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateActorimageRequest  $request
     * @param  \App\Models\Actorimage  $actorimage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActorimageRequest $request, Actorimage $actorimage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Actorimage  $actorimage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Actorimage $actorimage)
    {
        //
    }
}
