<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\SubscriptionController ;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout']);

Route::apiResource('membership',MembershipController::class);



// subscription
Route::apiResource('subscribe',SubscriptionController::class);
Route::post('subscribesUser/{user_id}', [SubscriptionController::class, 'subscribe_User']);
Route::post('subscriptions', [SubscriptionController::class, 'subscribe_Own_User']);
