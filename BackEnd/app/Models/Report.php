<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GymClass;
use App\Models\Trainer;
use App\Models\Trainee;

class Report extends Model
{
    use HasFactory;
    protected $fillable = ['recommend','over_all_comment','class_id','trainee_id','trainer_id'];

    public function report(){
        return $this->belongsTo(GymClass::class,'class_id','id');
    }
    public function reportTrainer(){
        return $this->belongsTo(Trainer::class,'trainer_id','user_id');
    }
    public function reportTrainee(){
        return $this->belongsTo(Trainee::class,'trainee_id','user_id');
    }
}
