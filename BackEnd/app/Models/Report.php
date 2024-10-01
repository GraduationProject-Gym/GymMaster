<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\GymClass;
class Report extends Model
{
    use HasFactory;
    protected $fillable = ['recommend','over_all_comment','class_id'];

    public function report(){
        return $this->belongsTo(GymClass::class,'class_id','id');
    }
}
