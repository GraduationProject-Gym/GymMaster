<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserClass extends Model
{
    use HasFactory;
    protected $fillable = ['class_id', 'equipment_id'];

    public function GymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }
}
