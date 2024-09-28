<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Exercise extends Model
{
    use HasFactory;
    use SoftDeletes; 
    protected $dates = ['deleted_at']; 
    protected $table = 'exercises';
    protected $fillable = [
        'name',
        'category',
        'no_of_times',
    ];
    public function gymClasses()
    {
        return $this->belongsToMany(GymClass::class, 'class_exerciess', 'exercise_id', 'class_id');
    }
    public function classes()
{
    return $this->belongsToMany(GymClass::class, 'class_exerciess', 'exercise_id', 'class_id');
}

}
