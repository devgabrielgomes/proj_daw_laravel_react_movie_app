<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'title',
        'year',
        'rating',
        'synopsis',
        'trailer',
        'runtime',
    ];

//    public function movieRoles() {
//        return $this->hasOne(Movierole::class);
//    }

    public function roles() {
        return $this->hasMany(Movierole::class);
    }

    public function movieGenres() {
        return $this->hasMany(Moviegenre::class);
    }

    public function myListsItems() {
        return $this->hasMany(Mylistitem::class);
    }

    public function movieImages() {
        return $this->hasOne(Movieimage::class);
    }
}

