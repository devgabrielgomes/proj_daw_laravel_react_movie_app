<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moviegenre extends Model
{
    protected $table='movie_genres';

    use HasFactory;
    public function movies() {
        return $this->belongsTo(Movie::class);
    }
}
