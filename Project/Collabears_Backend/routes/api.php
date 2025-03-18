<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('projects', ProjectController::class);


Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
// web.php
Route::get('dashboard', [ProjectController::class, 'getDashboardData']);
Route::put('/projects/{id}', [ProjectController::class, 'update']);
Route::get('/users', [AuthController::class, 'getAllUsers']);




