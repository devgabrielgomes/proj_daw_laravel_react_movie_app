<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    public function roles() {
        return $this->hasOne(Role::class);
    }

    public function actorImage() {
        return $this->hasOne(Actorimage::class);
    }
}
