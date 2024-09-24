<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GymClass extends Model
{
    use HasFactory;
    protected $table = 'gymclass';
    protected $fillable = [
        'name',
        'description',
        'total_no_sessions',
        'status',
        'max_trainee',
        'creator_id'
    ];

    public function useEquipment()
    {
       return $this->belongsToMany(GymClass::class, 'class_equipment', 'class_id', 'equipment_id');
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }

    public function user()
    {
       return $this->belongsToMany(User::class, 'user_class', 'class_id', 'user_id');
    }

    public function exercies()
    {
       return $this->belongsToMany(User::class, 'class_exercies', 'class_id', 'exercies_id');
    }
}
