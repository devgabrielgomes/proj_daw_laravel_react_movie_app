<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'id',
        'fk_id_movie',
        'fk_id_actor',
        'name',
    ];

    public function movie() {
        return $this->hasOne(Movierole::class);
    }

    public function actors() {
        return $this->hasOne(Actor::class);
    }
}
