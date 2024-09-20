<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembershipController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthController::class, 'store']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout',[AuthController::class, 'logout']);

Route::apiResource('membership',MembershipController::class);


// Route::post('api/reg', [AuthController::class, 'store']);
// Route::post('register', [AuthController::class, 'store'])->middleware('auth:sanctum');
// Route::post('login', [AuthController::class, 'login'])->middleware('auth:sanctum');
// Route::post('api/reg', [AuthController::class, 'store']);
// Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:sanctum');
