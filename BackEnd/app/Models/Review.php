<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Trainer;
use App\Models\Trainee;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['trainer_id','trainee_id'];
    public function ReviewTrainer(){
        return $this->belongsTo(Trainer::class, 'trainer_id','id');
    }
    public function ReviewTrainee(){
        return $this->belongsTo(Trainee::class, 'trainee_id','id');
    }
}
