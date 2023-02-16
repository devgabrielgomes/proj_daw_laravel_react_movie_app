<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movieimage extends Model
{
    protected $table='movie_images';
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'fk_id_movie',
        'cover',
        'background',
    ];

    public function movies() {
        return $this->belongsTo(Movie::class);
    }
}
