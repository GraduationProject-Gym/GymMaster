<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SubscriptionController ;
use App\Http\Controllers\Api\GymClassController;
use App\Http\Controllers\Api\EquipmentsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Auth User

Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');

// membership

Route::apiResource('membership',MembershipController::class);

// subscription
Route::apiResource('subscribe',SubscriptionController::class);
Route::post('subscribesUser/{user_id}', [SubscriptionController::class, 'subscribe_User']);
Route::post('subscriptions', [SubscriptionController::class, 'subscribe_Own_User']);


// gymclass
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/gym-classes', [GymClassController::class, 'index']);
    Route::get('/gym-classes/{gymClass}', [GymClassController::class, 'show']);
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