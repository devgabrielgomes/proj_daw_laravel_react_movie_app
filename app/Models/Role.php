<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    public $timestamps = false;

    public function movies() {
        return $this->belongsTo(Movie::class);
    }

    public function actors() {
        return $this->hasOne(Actor::class);
    }
}
