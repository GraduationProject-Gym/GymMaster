<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\GymClass;
use App\Models\Equipment;
use App\Models\Payment;
use App\Models\Schedule;
use App\Models\UserClass;
use App\Policies\GymClassPolicy;
use App\Policies\EquipmentPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\SchedulePolicy;
use App\Policies\TraineeClassPolicy;
class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        GymClass::class => GymClassPolicy::class,
        Equipment::class => EquipmentPolicy::class,
        \App\Models\Equipment::class => \App\Policies\EquipmentPolicy::class,
        Payment::class => PaymentPolicy::class,
        Schedule::class => SchedulePolicy::class,
        \App\Models\GymClass::class => \App\Policies\GymClassPolicy::class,
        Exercise::class => ExercisePolicy::class,
        Schedule::class => SchedulePolicy::class,
        UserClass::class => TraineeClassPolicy::class,
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
        //
        Gate::policy(GymClass::class, GymClassPolicy::class);
        Gate::policy(Equipment::class, EquipmentPolicy::class);
        Gate::policy(Payment::class, PaymentPolicy::class);
        Gate::policy(Schedule::class, SchedulePolicy::class);
        Gate::policy(UserClass::class, TraineeClassPolicy::class);

    }
}
