<?php

namespace App\Providers;

use App\Models\Review;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\GymClass;
use App\Models\Equipment;
use App\Models\Memberships;
use App\Models\Payment;
use App\Models\Schedule;
use App\Models\UserClass;
use App\Models\Exercise;
use App\Policies\GymClassPolicy;
use App\Policies\EquipmentPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\SchedulePolicy;
use App\Policies\ExercisePolicy;
use App\Policies\TraineeClassPolicy;
use App\Policies\MembershipPolicy;
use App\Policies\ReviewPolicy;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        GymClass::class => GymClassPolicy::class,
        Equipment::class => EquipmentPolicy::class,
        Payment::class => PaymentPolicy::class,
        Schedule::class => SchedulePolicy::class,
        UserClass::class => TraineeClassPolicy::class,
        Memberships::class => MembershipPolicy::class,
        UserClass::class => TraineeClassPolicy::class,
        Exercise::class => ExercisePolicy::class,
        Review::class => ReviewPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

    public function boot(): void
    {
        Gate::policy(Memberships::class, MembershipPolicy::class);
        Gate::policy(GymClass::class, GymClassPolicy::class);
        Gate::policy(Equipment::class, EquipmentPolicy::class);
        Gate::policy(Payment::class, PaymentPolicy::class);
        Gate::policy(Schedule::class, SchedulePolicy::class);
        Gate::policy(UserClass::class, TraineeClassPolicy::class);
        Gate::policy(Review::class, ReviewPolicy::class);


    }
}
