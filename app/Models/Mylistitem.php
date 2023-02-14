<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mylistitem extends Model
{
    protected $table='my_list_items';
    public $timestamps = false;
    use HasFactory;

    protected $fillable = [
        'fk_id_movie',
        'fk_id_my_list',
    ];

    public function movies() {
        return $this->hasMany(Movie::class);
    }

    public function myList() {
        return $this->hasOne(Mylist::class);
    }
}
