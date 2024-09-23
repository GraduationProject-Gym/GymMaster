<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Review;

class Trainer extends Model
{

    use HasFactory;
    protected $fillable = ['cv', 'user_id'];
    public function TraineeUser(){
        return $this->belongsTo(User::class, 'id','id');
    }

    public function ReviewTrainer()
    {
        return $this->hasMany(Review::class,'id','id');
    }
}
