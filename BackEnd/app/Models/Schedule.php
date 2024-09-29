<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Schedule extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'session_start',
        'session_end',
        'session_duration',
        'nameDay',
        'class_id',
        'date_day'
    ];
    public function gymClass()
    {
        return $this->belongsTo(GymClass::class, 'class_id');
    }

}
