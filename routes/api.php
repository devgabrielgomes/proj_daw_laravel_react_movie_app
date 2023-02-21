<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::post('/add_movie', [MovieController::class, 'add_movie']);
Route::group(['namespace' => 'App\Http\Controllers\V1'], function() {
    //MOVIE REQUESTS
    Route::get('movies', [App\Http\Controllers\V1\MovieController::class, 'index']);
    Route::post('movies/add', [App\Http\Controllers\V1\MovieController::class, 'store']);
    Route::get('movies/search/{term}', [App\Http\Controllers\V1\MovieController::class, 'show']);
    Route::delete('movies/remove/{id}', [App\Http\Controllers\V1\MovieController::class, 'destroy']);
    Route::post('movies/edit/{id}', [App\Http\Controllers\V1\MovieController::class, 'update']);

    //MOVIE IMAGES REQUESTS
    Route::get('movie_images', [App\Http\Controllers\V1\MovieimageController::class, 'index']);
    Route::post('movie_images/add', [App\Http\Controllers\V1\MovieimageController::class, 'store']);
    Route::delete('movie_images/remove/{id}', [App\Http\Controllers\V1\MovieimageController::class, 'destroy']);
    Route::post('movie_images/edit/{id}', [App\Http\Controllers\V1\MovieimageController::class, 'update']);

    //GENRES REQUESTS
    Route::get('genres', [App\Http\Controllers\V1\GenreController::class, 'index']);
    Route::post('genres/add', [App\Http\Controllers\V1\GenreController::class, 'store']);

    //MOVIE GENRES REQUESTS
    Route::get('movie_genres', [App\Http\Controllers\V1\MoviegenreController::class, 'index']);
    Route::post('movie_genres/add', [App\Http\Controllers\V1\MoviegenreController::class, 'store']);
    Route::delete('movie_genres/remove/{id}', [App\Http\Controllers\V1\MoviegenreController::class, 'destroy']);
    Route::post('movie_genres/edit/{id}', [App\Http\Controllers\V1\MoviegenreController::class, 'update']);

    //ROLES REQUESTS
    Route::get('roles', [App\Http\Controllers\V1\RoleController::class, 'index']);
    Route::post('roles/add', [App\Http\Controllers\V1\RoleController::class, 'store']);
    Route::delete('roles/remove/{id}', [App\Http\Controllers\V1\RoleController::class, 'destroy']);
    Route::post('roles/edit/{id}', [App\Http\Controllers\V1\RoleController::class, 'update']);

    //MY LIST ITEMS REQUESTS
    Route::get('my_list_items', [App\Http\Controllers\V1\MylistitemController::class, 'index']);
    Route::get('my_list_items/get_items', [App\Http\Controllers\V1\MylistitemController::class, 'getListItems']);
    Route::post('my_list_items/add', [App\Http\Controllers\V1\MylistitemController::class, 'store']);
    Route::delete('my_list_items/remove/{id}', [App\Http\Controllers\V1\MylistitemController::class, 'destroy']);

    //ACTORS REQUESTS
    Route::get('actors', [App\Http\Controllers\V1\ActorController::class, 'index']);
    Route::post('actors/add', [App\Http\Controllers\V1\ActorController::class, 'store']);

    //ACTORS IMAGES REQUESTS
    Route::post('actor_image/add', [App\Http\Controllers\V1\ActorimageController::class, 'store']);

    //Route::apiResource('movies', MovieController::class);
    //Route::apiResource('actors', ActorController::class);
   // Route::apiResource('genres', GenreController::class);
//    //Route::apiResource('movie_genres_old', MoviegenreController::class);
//    //Route::apiResource('movie_images', MovieimageController::class);
//    //Route::apiResource('actor_images', ActorimageController::class);
    //Route::apiResource('my_lists', MylistController::class);
//    Route::apiResource('my_list_items', MylistitemController::class);
    //Route::apiResource('roles', RoleController::class);
});
