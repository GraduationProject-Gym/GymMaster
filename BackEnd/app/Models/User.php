<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Subscription;
use App\Models\Vouchers;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'age',
        'image',
        'gender',
        'role'
    ];

    public function UserSubscription()
    {
        return $this->hasMany(Subscription::class,'user_id','id');
    }

    public function UserVoucher(){
        return $this->hasMany(Vouchers::class, 'user_id','id');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationship with Equipments
    public function useEquipment()
    {
       return $this->belongsToMany(User::class, 'user_equipment', 'user_id', 'equipment_id');
    }

    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'user_class', 'user_id', 'class_id');
    }
}
