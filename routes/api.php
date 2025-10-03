<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\BlogsController;

// Public routes
Route::post('/login', [AuthenticationController::class, 'authenticate']);
Route::post('/registration', [AuthenticationController::class, 'registration']);
Route::get('/show_blogs',[BlogsController::class,'show_blogs']);
Route::get('/show_reviews',[BlogsController::class,'show_reviews']);
Route::post('/reviews', [BlogsController::class, 'storeReview']); 

// Protected routes (requires authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/create_blogs', [BlogsController::class, 'create_blogs']);
    Route::post('/logout', [AuthenticationController::class, 'logout']);

});
