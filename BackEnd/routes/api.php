<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TraineeClassController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;



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
});

// Auth User
Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');

// trainee class
Route::apiResource('trainee-class',TraineeClassController::class);

// subscription
Route::apiResource('subscribe',SubscriptionController::class);
Route::post('subscribesUser/{user_id}', [SubscriptionController::class, 'subscribe_User']);
Route::post('subscriptions', [SubscriptionController::class, 'subscribe_Own_User']);

// api
Route::post('/create-payment', [SubscriptionController::class, 'store']);
Route::get('/payment/cancel', [SubscriptionController::class, 'cancel'])->name('cancel');
Route::get('/payment/success', [SubscriptionController::class, 'success'])->name('success');
