<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mylist extends Model
{
    protected $table='my_lists';
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'fk_id_user',
    ];

    public function users() {
        return $this->hasOne(User::class);
    }

    public function myListItems() {
        return $this->hasMany(Mylistitem::class);
    }
}
