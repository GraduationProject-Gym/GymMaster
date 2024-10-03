<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trainer;
use App\Models\Trainee;
use App\Models\GymClass;
class Review extends Model
{
    use HasFactory;
    protected $fillable = ['trainer_id','trainee_id','rating','comments','class_id'];
    public function ReviewTrainer(){
        return $this->belongsTo(Trainer::class, 'user_id','trainer_id');
    }
    public function ReviewTrainee(){
        return $this->belongsTo(Trainee::class, 'user_id','trainee_id');
    }
    public function Reviewclass(){
        return $this->belongsTo(GymClass::class, 'id','class_id');
    }
}
