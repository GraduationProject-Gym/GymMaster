<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Memberships;
use App\Models\User;
use App\Models\Review;
use App\Models\Trainer;

use App\Policies\TraineeClassPolicy;

class Trainee extends Model
{
    use HasFactory;
    protected $policies = [
        Trainee::class => TraineeClassPolicy::class,
    ];
    // admin will add no_vouchers
    // expiration_date will update automatic when update membership
    protected $fillable = ['goals','membership_id', 'user_id'];
    public function TraineeMembership(){
        return $this->belongsTo(Memberships::class, 'membership_id','id');
    }
    public function TraineeUser()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function ReviewTrainees()
    {
        return $this->hasMany(Review::class, 'id', 'id');
    }
    public function ReviewTrainee()
    {
        return $this->belongsToMany(Trainer::class, 'reviews', 'trainee_id', 'trainer_id');
    }// trainer_id','trainee_id
}
