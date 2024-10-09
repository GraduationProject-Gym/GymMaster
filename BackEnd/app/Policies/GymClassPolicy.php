<?php

namespace App\Policies;

use App\Models\User;
use App\Models\GymClass;
use Illuminate\Auth\Access\Response;

class GymClassPolicy
{
    /**
     * Determine whether the user can manage gym classes.
     */
    public function manage(User $user): bool
    {
        return $user->role === 'admin';
    }
    public function viewClass(User $user): bool
    {
        return $user->role === 'trainer';
    }


    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'admin' || $user->role === 'trainer' || $user->role === 'trainee';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, GymClass $gymClass): bool
    {
        return $user->role === 'admin' || $user->role === 'trainer' || $user->role === 'trainee';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'trainee' || $user->role === 'admin' ;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, GymClass $gymClass): bool
    {
        return $user->role === 'admin' || $user->role === 'trainer';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, GymClass $gymClass): bool
    {
        return $user->role === 'admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, GymClass $gymClass): bool
    {

        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, GymClass $gymClass): bool
    {

        return false;
    }
}

