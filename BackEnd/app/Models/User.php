<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\CustomResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Subscription;
use App\Models\Vouchers;
use App\Notifications\EmailVerification;
class User extends Authenticatable implements MustVerifyEmail
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
        'role',
        'token',
        'timer'
    ];

    public function sendEmailVerificationNotification()
    {
        $this->notify(new EmailVerification);
    }

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
    public function equipment()
    {
       return $this->belongsToMany(User::class, 'user_equipments', 'user_id', 'equipment_id');
    }

    public function gymClass()
    {
       return $this->belongsToMany(GymClass::class, 'user_classes', 'user_id', 'class_id');
    }
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new CustomResetPasswordNotification($token));
    }
    public function isAdmin()
    {
        return $this->role === 'admin'; 
    }
    public function trainer()
    {
        return $this->hasOne(Trainer::class, 'user_id');
    }
    public function trainee()
{
    return $this->hasOne(Trainee::class, 'user_id');
}

}
