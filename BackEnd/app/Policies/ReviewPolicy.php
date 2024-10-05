<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ReviewPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
        return $user !== null;
    }

    /**
     * Determine whether the user can view the model.
     */
    // public function view(User $user, Review $review): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
        return $user->role === "trainee" || $user->role === "trainer";
    }
    /**
     * Determine whether the user can update the model.
     */
    public function report(User $user): bool
    {
        //
        return $user->role === "trainer";

    }

    /**
     * Determine whether the user can delete the model.
     */
    public function traineeReports(User $user): bool
    {
        return $user->role === "trainee";

    }

    /**
     * Determine whether the user can restore the model.
     */
    // public function restore(User $user, Review $review): bool
    // {
    //     //
    // }

    /**
     * Determine whether the user can permanently delete the model.
     */
    // public function forceDelete(User $user, Review $review): bool
    // {
    //     //
    // }
}
