<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Vouchers extends Model
{
    use HasFactory;
    protected $fillable = ['method_invite','user_id'];

    public function UserVoucher(){
        return $this->belongsTo(User::class, 'id','user_id');
    }
    

}
