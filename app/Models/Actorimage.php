<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actorimage extends Model
{
    protected $table='actor_images';
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'fk_id_movie',
        'cover',
        'background'
    ];

    public function actor() {
        return $this->hasOne(Actor::class);
    }
}
