<?php

namespace App\Policies;

use App\Models\User;

class TraineeUserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    public function viewAllTrainees(User $user)
    {
        return $user->role === 'admin';
    }
}
