<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'category',
        'no_of_times',
    ];
    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'class_exercies', 'exercies_id', 'class_id');
    }
    public function gymClasses()
    {
        return $this->belongsToMany(GymClass::class, 'class_exerciess', 'exercise_id', 'class_id');
    }
}
