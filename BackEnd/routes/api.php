<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SubscriptionController ;
use App\Http\Controllers\Api\GymClassController;
use App\Http\Controllers\Api\EquipmentsController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\ScheduleController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\TraineeClassController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\EquipmentController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ReportController;

use App\Models\Attendance;

Route::resource('schedules', ScheduleController::class);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// verification email
Route::post('email-verification', [AuthController::class, 'verifyEmail']);

// authorization
Route::middleware(['auth:sanctum'])->group( function () {
    // membership
    Route::apiResource('membership',MembershipController::class);
    // subscription
    Route::apiResource('subscribe',SubscriptionController::class);
    Route::post('subscribesUser/{user_id}', [SubscriptionController::class, 'subscribe_User']);
    Route::post('subscriptions', [SubscriptionController::class, 'subscribe_Own_User']);

    // trainee Membership
    Route::post('create-membership', [TraineeClassController::class, 'updateMemperTrainee']);
    Route::post('goals', [TraineeClassController::class, 'addAndUpdateGoals']);
    // Review
    // indexTraineeReviews
    Route::get('review/trainee-reviews', [ReviewController::class, 'indexTraineeReviews']);
    Route::apiResource('review',ReviewController::class);
    // trainees on one class
    // Route::post('trainees', [TraineeClassController::class, 'trainees']);
    Route::get('showuserdata', [AuthController::class, 'showuserdata']);
    Route::get('trainees', [TraineeClassController::class, 'trainees']);

    Route::get('/getClassTrainer', [GymClassController::class, 'getClassTrainer']);

    // Report && review
    Route::apiResource('reportRecommend',ReportController::class);
    Route::post('report', [ReviewController::class, 'report']);
    Route::get('reportTrainee', [ReviewController::class, 'reportTrainee']);
    Route::post('/payment/success', [SubscriptionController::class, 'success'])->name('success');
    Route::post('/payment/cancel', [SubscriptionController::class, 'cancel'])->name('cancel');
});

//reportTrainee

// Auth User
Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
Route::apiResource('users', AuthController::class);
Route::post('users/{id}', [AuthController::class, 'update']);
// Route::post('users/{id}/delete', [AuthController::class, 'delete']);

// membership
Route::post('trainee-class/joined-classes', [TraineeClassController::class, 'showJoinedClasses']);
Route::get('trainee-class/joined-classes-trainers', [TraineeClassController::class, 'indexJoinedClassesTrainers']);
Route::apiResource('trainee-class',TraineeClassController::class);
// Route::apiResource('schedule',SchedulesController::class);
Route::apiResource('equipment',EquipmentController::class);
Route::post('equipment/workon',[EquipmentController::class, 'workOn']);
Route::post('/forgot-password', [AuthController::class, 'forgetPassword'])->middleware('guest');
Route::post('forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');



// gymclass
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/gym-classes', [GymClassController::class, 'index']);
    Route::get('/gym-classes/{id}', [GymClassController::class, 'show']);
    Route::post('/gym-classes', [GymClassController::class, 'store']);
    Route::put('/gym-classes/{gymClass}', [GymClassController::class, 'update']);
    Route::delete('/gym-classes/{gymClass}', [GymClassController::class, 'destroy']);
    Route::patch('/gym-classes/restore/{gymClass}', [GymClassController::class, 'restore'])->name('equipments.restore');

});


//equipments
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/equipments', [EquipmentsController::class, 'index'])->name('equipments.index');
    Route::post('/equipments', [EquipmentsController::class, 'store'])->name('equipments.store');
    Route::get('/equipments/{id}', [EquipmentsController::class, 'show'])->name('equipments.show');
    Route::put('/equipments/{id}', [EquipmentsController::class, 'update'])->name('equipments.update');
    Route::delete('/equipments/{id}', [EquipmentsController::class, 'destroy'])->name('equipments.destroy');
    Route::patch('/equipments/restore/{id}', [EquipmentsController::class, 'restore'])->name('equipments.restore');

    });



// Exercises Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/exercises', [ExerciseController::class, 'index'])->name('exercises.index');
    Route::post('/exercises', [ExerciseController::class, 'store'])->name('exercises.store');
    Route::get('/exercises/{id}', [ExerciseController::class, 'show'])->name('exercises.show');
    Route::put('/exercises/{id}', [ExerciseController::class, 'update'])->name('exercises.update');
    Route::delete('/exercises/{id}', [ExerciseController::class, 'destroy'])->name('exercises.destroy');
    Route::patch('/exercises/restore/{id}', [ExerciseController::class, 'restore'])->name('exercises.restore');
});


//schedules
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/schedules', [ScheduleController::class, 'index'])->name('schedules.index');
    Route::post('/schedules', [ScheduleController::class, 'store'])->name('schedules.store');
    Route::get('/schedules/{id}', [ScheduleController::class, 'show'])->name('schedules.show');
    Route::put('/schedules/{id}', [ScheduleController::class, 'update'])->name('schedules.update');
    Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy'])->name('schedules.destroy');
    Route::patch('/schedules/restore/{id}', [ScheduleController::class, 'restore'])->name('schedules.restore');
});
// api
// Route::post('/create-payment', [SubscriptionController::class, 'store']);
// Route::get('/payment/success/{membership_id}', [SubscriptionController::class, 'success'])->name('success');

// Attendance
Route::post('attendance', [AttendanceController::class, 'index']);
Route::post('attendance/checkin', [AttendanceController::class, 'checkin']);
Route::post('attendance/checkout', [AttendanceController::class, 'checkout']);
