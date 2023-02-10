<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'year',
        'rating',
        'synopsis',
        'trailer',
        'runtime',
    ];

    public function roles() {
        return $this->hasMany(Role::class);
    }

    public function movieGenres() {
        return $this->hasMany(Moviegenre::class);
    }

    public function myListsItems() {
        return $this->hasMany(Mylistitem::class);
    }

    public function movieImages() {
        return $this->hasMany(Movieimage::class);
    }
}

