<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;
    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'class_exercies', 'exercies_id', 'class_id');
    }
}
