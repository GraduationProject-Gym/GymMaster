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
    // admin will add no_vouchers
    // expiration_date will update automatic when update membership
    protected $fillable = ['goals','membership_id', 'user_id'];
    public function TraineeMembership(){
        return $this->belongsTo(Memberships::class, 'membership_id','id');
    }
    public function TraineeUser(){
        return $this->belongsTo(User::class, 'id','user_id');
    }

    public function ReviewTrainee()
    {
        return $this->hasMany(Review::class,'id','id');
    }
}
