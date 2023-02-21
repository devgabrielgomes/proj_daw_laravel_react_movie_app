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
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function index(Request $request)
    {
        $result = DB::table('roles')
            ->join('actors', 'actors.id', '=', 'roles.fk_id_actor')
            ->join('actor_images', 'actor_images.id', '=', 'actors.id')
            ->select('roles.id', 'roles.fk_id_movie as idMovie', 'actors.name as actorName', 'roles.name as roleName', 'actor_images.photo as actorPhoto')
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
        $actors = $request->actors;
        $roles = $request->roles;

        for($i=0; $i<count($actors); $i++){
            $datasave = [
                'id' => $id + $i,
                'fk_id_movie' => $fk_id_movie,
                'fk_id_actor' => $actors[$i],
                'name' => $roles[$i],
            ];
            DB::table('roles')->insert($datasave);
        }
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
     * @param $id
     * @return void
     */
    public function destroy($id)
    {
        Role::where('fk_id_movie', '=', $id)->delete();
    }
}
