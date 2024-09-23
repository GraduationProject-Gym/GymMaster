<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class ClassEquipment extends Model
{
    use HasFactory;
    protected $table = 'class_equipments'; 

    protected $fillable = ['class_id', 'equipment_id'];

    public function gymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id'); 
    }
}

