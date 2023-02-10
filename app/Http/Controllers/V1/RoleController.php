<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\RoleFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Http\Resources\V1\RoleCollection;
use App\Http\Resources\V1\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new RoleFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new RoleCollection(Role::all());
        } else {
            $roles = Role::where($filterItems)->paginate();

            return new RoleCollection($roles->appends($request->query()));
        }
    }

    public function innerJoin()
    {
        $result = DB::table('roles')
            ->join('actors', 'actors.id', '=', 'roles.fk_id_actor')
            ->join('actor_images', 'actor_images.id', '=', 'actors.id')
            ->select('roles.id', 'roles.fk_id_movie as idMovie', 'actors.name as actorName', 'roles.name', 'actor_images.photo as actorPhoto')
            ->get();

        return $result;
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreRoleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRoleRequest $request)
    {
        return new RoleResource(Role::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRoleRequest  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        //
    }
}
