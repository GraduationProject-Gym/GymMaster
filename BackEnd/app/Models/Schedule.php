<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;
    protected $fillable = [
        'session_start',
        'session_end',
        'session_duration',
        'nameDay',
        'class_id'
    ];
    public function gymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }
}
