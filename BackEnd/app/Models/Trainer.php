<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Review;
use App\Models\GymClass;
class Trainer extends Model
{

    use HasFactory;
    protected $fillable = ['cv', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function gymClass()
    {
        return $this->hasMany(GymClass::class, 'trainer_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function ClassTrainer()
    {
        return $this->hasMany(GymClass::class,'trainer_id','user_id');
    }
}
