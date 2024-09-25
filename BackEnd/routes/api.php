<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SubscriptionController ;
use Illuminate\Foundation\Auth\EmailVerificationRequest;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
//





// verification email

Route::get('/verify-email', [AuthController::class, 'verifyEmail']);

// Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
//     $request->fulfill();  // Mark the email as verified
//     return response()->json(['message' => 'Email verified successfully.']);
// })->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

// // Route to send the email verification notification again
// Route::post('/email/verification-notification', function (Request $request) {
//     if ($request->user()->hasVerifiedEmail()) {
//         return response()->json(['message' => 'Email already verified.']);
//     }
//     $request->user()->sendEmailVerificationNotification();
//     return response()->json(['message' => 'Verification email sent.']);
// })->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');




//
Route::middleware(['auth:sanctum'])->group( function () {
    // membership
    Route::apiResource('membership',MembershipController::class);

    // subscription
    Route::apiResource('subscribe',SubscriptionController::class);
    Route::post('subscribesUser/{user_id}', [SubscriptionController::class, 'subscribe_User']);
    Route::post('subscriptions', [SubscriptionController::class, 'subscribe_Own_User']);

    //
});

// Auth User
Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');



// subscription



// api
Route::post('/create-payment-intent', [SubscriptionController::class, 'store']);
Route::post('/confirm-payment', [SubscriptionController::class, 'confirmPayment']);
