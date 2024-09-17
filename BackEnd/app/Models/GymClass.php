<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GymClass extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'total_no_sessions',
        'status',
        'max_trainee'
    ];
    public function useEquipment()
    {
       return $this->belongsToMany(GymClass::class, 'class_equipment', 'class_id', 'equipment_id');
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }
}
