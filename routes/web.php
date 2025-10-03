<?php
use App\Http\Controllers\Web\BlogsController;
use App\Http\Controllers\Web\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BlogsController::class, 'index']);
Route::get('/login',[LoginController::class,'showLoginForm']);
Route::get('/register',[LoginController::class,'showRegisterForm']);
Route::get('/blogs',[BlogsController::class,'blogs_list']);
Route::get('/blogs/{id}', [BlogsController::class, 'show'])->name('blogs.detail');


Route::get('/create_blog',[BlogsController::class,'blog_adding_page'])->name('blogs.index');