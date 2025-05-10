<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\UserController;

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

Route::resource('columns', ColumnController::class);
Route::resource('tasks', TaskController::class);

Route::get('/tasks-with-due-dates', [TaskController::class, 'tasksWithDueDates']);

Route::middleware('auth:api')->group(function () {
    Route::post('/favorites/{projectId}/toggle', [FavoriteController::class, 'toggleFavorite']);
});

Route::middleware('auth:sanctum')->put('/user', [UserController::class, 'update']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::get('/my-projects', [ProjectController::class, 'myProjects']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/projects/{id}/invite', [ProjectController::class, 'inviteToProject']);
    Route::get('/invitations/accept/{token}', [ProjectController::class, 'acceptInvitation']);
});

Route::post('/projects/{id}/add-member', [ProjectController::class, 'addMember']);
Route::get('/projects/{id}/members', [ProjectController::class, 'getMembers']);
Route::post('/projects/{id}/update-role', [ProjectController::class, 'updateRole']);
Route::delete('/projects/{id}/remove-member', [ProjectController::class, 'removeMember']);
Route::middleware('auth:sanctum')->post('/users/subscription', [UserController::class, 'updateSubscription']);