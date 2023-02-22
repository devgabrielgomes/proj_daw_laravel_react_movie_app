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
     * @param Request $request
     * @return MovieimageCollection
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

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return void
     */

    public function store(Request $request)
    {
        $movie_image = new Movieimage();

        $movie_image->fk_id_movie = $request->fk_id_movie;
        if($request->cover != "" && $request->background != "") {
            $img_cover = $request->file('cover');
            $img_background = $request->file('background');
            $extension_cover = $img_cover->getClientOriginalExtension();
            $extension_background = $img_background->getClientOriginalExtension();

            $filename_cover = "cover_movie_".$request->fk_id_movie.".".$extension_cover;
            $filename_background = "background_movie_".$request->fk_id_movie.".".$extension_background;

            $upload_path_cover = "uploads/movie_images/cover/";
            $upload_path_background = "uploads/movie_images/background/";

            $img_cover->move($upload_path_cover, $filename_cover);
            $img_background->move($upload_path_background, $filename_background);

            $movie_image->cover = $filename_cover;
            $movie_image->background = $filename_background;
        }
        $movie_image->save();
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
     * @param Request $request
     * @param $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        $movie_image_last = Movieimage::where('fk_id_movie', $id)->first();;
        $cover_path = "uploads/movie_images/cover/";
        $background_path = "uploads/movie_images/background/";

        $cover_image = $cover_path.$movie_image_last->cover;
        $background_image = $background_path. $movie_image_last->background;

        if(file_exists($cover_image) && (file_exists($background_image))) {
            @unlink($cover_image);
            @unlink($background_image);
        }
        $movie_image_last->delete();

        $movie_image = new Movieimage();
        $movie_image->fk_id_movie = $request->fk_id_movie;
        if($request->cover != "" && $request->background != "") {
            $img_cover = $request->file('cover');
            $img_background = $request->file('background');
            $extension_cover = $img_cover->getClientOriginalExtension();
            $extension_background = $img_background->getClientOriginalExtension();

            $filename_cover = "cover_movie_".$request->fk_id_movie.".".$extension_cover;
            $filename_background = "background_movie_".$request->fk_id_movie.".".$extension_background;

            $img_cover->move($cover_path, $filename_cover);
            $img_background->move($background_path, $filename_background);

            $movie_image->cover = $filename_cover;
            $movie_image->background = $filename_background;
        }
        $movie_image->save();
    }

    /**
     * Remove the specified resource from storage.
     * @param $id
     * @return void
     */
    public function destroy($id)
    {
        $movie_image = Movieimage::where('fk_id_movie', $id)->first();;
        $cover_path = "uploads/movie_images/cover/";
        $background_path = "uploads/movie_images/background/";

        $cover_image = $cover_path.$movie_image->cover;
        $background_image = $background_path. $movie_image->background;

        if(file_exists($cover_image) && (file_exists($background_image))) {
            @unlink($cover_image);
            @unlink($background_image);
        }
        Movieimage::where('fk_id_movie', $id)->delete();
    }
}
