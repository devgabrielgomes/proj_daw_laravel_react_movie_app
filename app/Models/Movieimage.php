<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movieimage extends Model
{
    protected $table='movie_images';
    use HasFactory;

    public function movies() {
        return $this->hasOne(Movie::class);
    }
}
