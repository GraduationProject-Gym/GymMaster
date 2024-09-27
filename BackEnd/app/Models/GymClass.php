<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class GymClass extends Model
{
    use HasFactory,SoftDeletes;
    use SoftDeletes; 

    protected $dates = ['deleted_at']; 
    protected $table = 'gymclass';
    protected $fillable = [
        'name',
        'description',
        'total_no_of_session',
        'status',
        'max_trainee',
        'trainer_id'
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
    public function equipments()
    {
        return $this->belongsToMany(Equipment::class, 'class_equipments', 'class_id', 'equipment_id');
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'class_exerciess', 'class_id', 'exercise_id');
    }
    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }
    
}
