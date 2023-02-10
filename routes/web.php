<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\MovieController;


Route::get('movies', [MovieController::class, 'index']);


Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\V1\MovieController::class, 'index'])->name('home');




Route::get('inner-join-roles', [App\Http\Controllers\V1\RoleController::class, 'innerJoin']);
