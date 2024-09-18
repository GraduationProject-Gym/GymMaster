<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memberships;
use App\Models\User;
use App\Models\Review;

class Trainee extends Model
{
    use HasFactory;
    protected $fillable = ['goals','no_vouchers','expiration_date','membership_id'];
    public function TraineeMembership(){
        return $this->belongsTo(Memberships::class, 'membership_id','id');
    }
    public function TraineeUser(){
        return $this->belongsTo(User::class, 'id','id');
    }

    public function ReviewTrainee()
    {
        return $this->hasMany(Review::class,'id','id');
    }
}
