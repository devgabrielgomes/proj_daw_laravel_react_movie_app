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
    //Route::apiResource('movies', MovieController::class);
    Route::apiResource('actors', ActorController::class);
    Route::apiResource('genres', GenreController::class);
    Route::apiResource('movie_genres', MoviegenreController::class);
    Route::apiResource('movie_images', MovieimageController::class);
    Route::apiResource('actor_images', ActorimageController::class);
    Route::apiResource('my_lists', MylistController::class);
    Route::apiResource('my_list_items', MylistitemController::class);
    Route::apiResource('roles', RoleController::class);
});
