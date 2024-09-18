<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassExercie extends Model
{
    use HasFactory;
    protected $fillable = ['class_id', 'exercies_id'];

    public function GymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }

    public function exercies()
    {
        return $this->belongsTo(Exercise::class, 'exercies_id');
    }
}
