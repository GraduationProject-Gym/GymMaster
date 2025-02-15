<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Review;
use App\Models\GymClass;
use App\Models\Trainee;


class Trainer extends Model
{

    use HasFactory;
    protected $fillable = ['cv', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id','id');
    }

    public function gymClass()
    {
        return $this->hasMany(GymClass::class, 'trainer_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function gymClasses()
    {
        return $this->hasMany(GymClass::class, 'trainer_id');
    }
    public function ClassTrainer()
    {
        return $this->hasMany(GymClass::class,'trainer_id','user_id');
    }
    public function ReviewTrainer()
    {
        return $this->belongsToMany(Trainee::class, 'reviews', 'trainer_id', 'trainee_id');
    }
    public function reportTrainer(){
        return $this->hasMany(Report::class,'trainer_id','user_id');
    }
}
