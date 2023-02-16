<?php

namespace App\Http\Controllers\V1;

use App\Filters\V1\MovieimageFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMovieimageRequest;
use App\Http\Requests\UpdateMovieimageRequest;
use App\Http\Resources\V1\MovieimageCollection;
use App\Http\Resources\V1\MovieimageResource;
use App\Models\Movieimage;
use Illuminate\Http\Request;

class MovieimageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filter = new MovieimageFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]
        if(count($filterItems) == 0) {
            return new MovieimageCollection(Movieimage::all());
        } else {
            $movie_images = Movieimage::where($filterItems)->paginate();

            return new MovieimageCollection($movie_images->appends($request->query()));
        }
    }

    public function addImages(Request $request) {
        $movie_image = new Movieimage();

        $fk_id_movie = $request->fk_id_movie;
        $movie_image->fk_id_movie = $fk_id_movie;
        if($request->cover != "" && $request->background != "") {
            $img_cover = $request->file('cover');
            $img_background = $request->file('background');
            $extension_cover = $img_cover->getClientOriginalExtension();
            $extension_background = $img_background->getClientOriginalExtension();

            $file_name_cover = "cover_movie_".$fk_id_movie.".".$extension_cover;
            $file_name_background = "background_movie_".$fk_id_movie.".".$extension_background;

            $upload_path_cover = "/uploads/movie_images/cover/";
            $upload_path_background = "/uploads/movie_images/background/";

            $img_cover->move($upload_path_cover, $file_name_cover);
            $img_background->move($upload_path_background, $file_name_background);

            $movie_image->cover = $file_name_cover;
            $movie_image->background = $file_name_background;
        } else {
            $movie_image->cover = "cover.jpg";
            $movie_image->background = "background.jpg";
        }
//        $movie_image->cover = $file_name_cover;
//        $movie_image->background = $file_name_background;
        $movie_image->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreMovieimageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMovieimageRequest $request)
    {
        return new MovieimageResource(Movieimage::create($request->all()));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Movieimage  $movieimage
     * @return \Illuminate\Http\Response
     */
    public function show(Movieimage $movieimage)
    {
        return new MovieimageResource($movieimage);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMovieimageRequest  $request
     * @param  \App\Models\Movieimage  $movieimage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMovieimageRequest $request, Movieimage $movieimage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Movieimage  $movieimage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Movieimage $movieimage)
    {
        //
    }
}
