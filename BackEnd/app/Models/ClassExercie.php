<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassExercie extends Model
{
    use HasFactory;
    
    // Correct table name as per your database
    protected $table = 'class_exerciess';

    // Define fillable attributes
    protected $fillable = ['class_id', 'exercies_id'];

    // Define relationship to GymClass
    public function gymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }

    // Define relationship to Exercise
    public function exercise()
    {
        return $this->belongsTo(Exercise::class, 'exercise_id');
    }
}
