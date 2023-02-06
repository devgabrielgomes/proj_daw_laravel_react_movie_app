<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'year' => ['required'],
            'rating' => ['required'],
            'synopsis' => ['required'],
            'trailer' => ['required'],
            'runtime' => ['required'],
        ];
    }

    protected function prepareForValidation() {
        $this->merge([
            'fk_id_movie_image' => $this->idMovieImage
        ]);
    }
}
