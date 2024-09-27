<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 

class Equipment extends Model
{
    use HasFactory;
    use SoftDeletes; 
    protected $table = 'equipments'; 
    protected $fillable = [
        'name',
        'used_weight',
        'number_of_equipments'
    ];

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_equipment', 'equipment_id', 'user_id');
    }

    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'class_equipment', 'equipment_id', 'class_id');
    }
    public function gymClasses()
    {
        return $this->belongsToMany(GymClass::class, 'class_equipments', 'equipment_id', 'class_id');
    }
}