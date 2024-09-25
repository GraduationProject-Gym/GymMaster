<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    use HasFactory;
    protected $table = 'equipments';
    protected $fillable = [
        'name',
        'used_weight'
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_equipment', 'equipment_id', 'user_id');
    }

    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'class_equipments', 'equipment_id', 'class_id');
    }
}