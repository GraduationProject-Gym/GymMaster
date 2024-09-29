<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Trainee;

 class TraineeClassPolicy
{
    /**
     * Determine whether the user can view any trainee es.
     */
    public function viewAny(User $user)
    {
        return $user->role === 'trainee' || $user->role === 'trainer';
    }

    /**
     * Determine whether the user can view the trainee .
     */
    public function view(User $user, Trainee $trainee)
    {
        // return $user->role === 'trainee' ;//|| $user->role === 'trainer';
    }

    /**
     * Determine whether the user can create trainee es.
     */
    public function create(User $user)
    {
        return $user->role === 'trainee';
    }


    /**
     * Determine whether the user can update the trainee .
     */
    public function update(User $user, Trainee $trainee)
    {
        // return $user->role === 'trainer';
    }

    /**
     * Determine whether the user can delete the trainee .
     */
    public function delete(User $user, Trainee $trainee)
    {
        // return $user->role === 'trainer';
    }
}
