<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movieimage extends Model
{
    protected $table='movie_images';
    use HasFactory;

    protected $fillable = [
        'idMovie',
        'cover',
        'background',
    ];

    public function movies() {
        return $this->belongsTo(Movie::class);
    }
}
