<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GymClass extends Model
{
    use HasFactory;
    // protected $table = 'gymclass';
    protected $table = 'gym_classes';
    protected $fillable = [
        'name',
        'description',
        'total_no_sessions',
        'status',
        'max_trainee'
    ];
    // public function useEquipment()
    // {
    //    return $this->belongsToMany(GymClass::class, 'class_equipments', 'class_id', 'equipment_id');
    // }

    public function equipment()
{
    return $this->belongsToMany(Equipment::class, 'class_equipments', 'class_id', 'equipment_id');
}



    public function schedule()
    {
        return $this->hasMany(Schedule::class, 'class_id');
    }

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function user()
    {
       return $this->belongsToMany(User::class, 'user_class', 'class_id', 'user_id', 'user_classes');
    }

    public function exercises()
{
    return $this->belongsToMany(Exercise::class, 'class_exerciess', 'class_id', 'exercise_id');
}



}
