<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserClass extends Model
{
    use HasFactory;
    protected $table = 'user_classes';
    protected $fillable = ['class_id', 'user_id'];

    public function GymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function trainer()
    {
        return $this->hasOne(Trainer::class, 'user_id');
    }
}
