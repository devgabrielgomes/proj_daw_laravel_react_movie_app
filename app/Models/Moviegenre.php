<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moviegenre extends Model
{
    protected $table='movie_genres';
    public $timestamps = false;

    protected $fillable = [
        'fk_id_movie',
        'fk_id_genre',
    ];


    use HasFactory;
    public function movies() {
        return $this->belongsTo(Movie::class);
    }
}
