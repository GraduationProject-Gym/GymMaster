<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Trainer;
use App\Models\Equipment;
use Carbon\Carbon;


class GymClass extends Model
{
    use HasFactory,SoftDeletes;
    use SoftDeletes; 

    protected $dates = ['deleted_at']; 
    // protected $table = 'gymclass';
    protected $table = 'gym_classes';
    protected $fillable = [
        'name',
        'description',
        'total_no_of_session',
        'status',
        'max_trainee',
        'trainer_id'
    ];
    // public function useEquipment()
    // {
    //    return $this->belongsToMany(GymClass::class, 'class_equipments', 'class_id', 'equipment_id');
    // }

    public function equipment()
    {
        return $this->belongsToMany(Equipment::class, 'class_equipments', 'class_id', 'equipment_id');
    }
    public function review(){
        return $this->hasMany(Review::class,'class_id','id');
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class, 'class_id')->whereBetween('date_day', [
            Carbon::today(), // Current date
            Carbon::today()->addDays(7) // 7 days from today
        ]);
    }
    public function scheduleReport()
    {
        return $this->hasMany(Schedule::class, 'class_id','id');
    }

    public function report(){
        return $this->hasMany(Report::class,'class_id','id');
    }

    public function trainer()
    {
        return $this->belongsTo(Trainer::class, 'trainer_id');
    }

    public function user()
    {
        return $this->belongsToMany(User::class, 'user_classes', 'class_id', 'user_id');
    }

    public function equipments()
    {
        return $this->belongsToMany(Equipment::class, 'class_equipments', 'class_id', 'equipment_id');
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'class_exerciess', 'class_id', 'exercise_id');
    }

    public function classTrainer(){
        return $this->belongsTo(Trainer::class, 'id','trainer_id');
    }



}
