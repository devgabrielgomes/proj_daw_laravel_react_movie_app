<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\V1\MovieController;
//require('./resources/js/components/pages/Mylist.jsx');

//Route::get('movies', [MovieController::class, 'index']);
//import Mylist from "../components/pages/Mylist"
//import Home from "../components/pages/Home"
//import MovieInfo from '../components/pages/MovieInfo';
//import EditMovie from "../components/movies/EditMovie.jsx";
//import AddMovie from "../components/movies/AddMovie.jsx";
//import NotFound from "../components/NotFound";
//import Management from "../components/movies/Management";

Route::get('/', function () {
    return view('welcome');
});

//Route::get('/management', [
//    'uses' => 'ManagementMovie@ManagementMovie',
//    'as' => 'react',
//    'where' => ['path' => '.*']
//]);


Auth::routes();

//<Route path="/" element={<Home />} />
//                    <Route path="/my_list" element={<Mylist />} />
//                    <Route path="/movie_info/:id" element={<MovieInfo />} />
//                    <Route path="/management" element={<Management />} />
//                    <Route path="/management/add_movie" element={<AddMovie />} />
//                    <Route path="/management/edit_movie/:id" element={<EditMovie />} />
//                    <Route path="/*" element={<NotFound />} />
