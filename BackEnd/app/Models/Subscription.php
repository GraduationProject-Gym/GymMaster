<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Subscription extends Model
{
    use HasFactory;
    protected $fillable = ['amount', 'payment_method','bill_image','user_id'];
    public function UserSubscription(){
        return $this->belongsTo(User::class, 'id','user_id');
    }
}
