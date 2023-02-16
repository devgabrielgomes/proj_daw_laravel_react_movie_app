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
    Route::get('movies', [App\Http\Controllers\V1\MovieController::class, 'getMovies']);
    Route::get('roles', [App\Http\Controllers\V1\RoleController::class, 'getRoles']);
    Route::get('movie_genres', [App\Http\Controllers\V1\MoviegenreController::class, 'getMovieGenres']);
    Route::get('my_list_items', [App\Http\Controllers\V1\MylistitemController::class, 'getListItems']);
    Route::get('get_list_movies', [App\Http\Controllers\V1\MylistitemController::class, 'getListMovies']);

    Route::post('my_list_items/add_movie', [App\Http\Controllers\V1\MylistitemController::class, 'addMyListItem']);
    Route::post('movies/add_movie', [App\Http\Controllers\V1\MovieController::class, 'addMovie']);

    Route::post('movie_images/add_images', [App\Http\Controllers\V1\MovieimageController::class, 'addImages']);


    Route::delete('my_list_items/remove_movie/{id}', [App\Http\Controllers\V1\MylistitemController::class, 'removeMyListItem']);
    Route::delete('movies/remove_movie/{id}', [App\Http\Controllers\V1\MovieController::class, 'removeMovie']);




    //Route::apiResource('movies', MovieController::class);
    //Route::apiResource('actors', ActorController::class);
    Route::apiResource('genres', GenreController::class);
//    //Route::apiResource('movie_genres_old', MoviegenreController::class);
//    //Route::apiResource('movie_images', MovieimageController::class);
//    //Route::apiResource('actor_images', ActorimageController::class);
    Route::apiResource('my_lists', MylistController::class);
//    Route::apiResource('my_list_items', MylistitemController::class);
    //Route::apiResource('roles', RoleController::class);
});
