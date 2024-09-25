<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\GymClass;
use App\Models\Equipment;
use App\Models\Payment;
use App\Models\Schedule;
use App\Policies\GymClassPolicy;
use App\Policies\EquipmentPolicy;
use App\Policies\PaymentPolicy;
use App\Policies\SchedulePolicy;
use App\Policies\MembershipPolicy;
use Illuminate\Support\Facades\Gate;

use App\Models\Memberships;

class AppServiceProvider extends ServiceProvider
{
    protected $policies = [
        GymClass::class => GymClassPolicy::class,
        Equipment::class => EquipmentPolicy::class,
        Payment::class => PaymentPolicy::class,
        Schedule::class => SchedulePolicy::class,
        Memberships::class => MembershipPolicy::class,

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
        Gate::policy(Memberships::class, MembershipPolicy::class);
    }
}
