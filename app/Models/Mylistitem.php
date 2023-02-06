<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mylistitem extends Model
{
    protected $table='my_list_items';
    use HasFactory;

    public function movies() {
        return $this->hasMany(Movie::class);
    }

    public function my_lists() {
        return $this->hasOne(Mylist::class);
    }
}
