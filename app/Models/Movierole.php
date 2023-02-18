<?php
//
//namespace App\Models;
//
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
//
//class Movierole extends Model
//{
//    protected $table='movie_roles';
//    use HasFactory;
//    public $timestamps = false;
//
//    protected $fillable = [
//        'id',
//        'fk_id_movie',
//        'fk_id_role',
//    ];
//
//    public function movies() {
//        return $this->belongsTo(Movie::class);
//    }
//
//    public function roles() {
//        return $this->hasMany(Role::class);
//    }
//}
