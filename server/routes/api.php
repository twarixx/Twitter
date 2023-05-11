<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RelationshipController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('search/{query}/{token}', [UserController::class, 'search']);

Route::post('logout', [UserController::class, 'logout']);
Route::post('login', [UserController::class, 'login']);

// voor admin
//TODO Route::get('users', [UserController::class, 'index']);
Route::get('user/{user}/{token}', [UserController::class, 'show']);
Route::post('register', [UserController::class, 'store']);
Route::put('user/{user}', [UserController::class, 'update']);
Route::delete('user/{user}', [UserController::class, 'destroy']);

Route::post('relationship', [RelationshipController::class, 'update']);

Route::get('posts', [PostController::class, 'index']);
Route::get('posts/user/{user}', [PostController::class, 'index_by_user']);
Route::get('post/{post}', [PostController::class, 'show']);
Route::post('post', [PostController::class, 'store']);
Route::post('post/image', [PostController::class, 'upload_image']);
Route::put('post/{post}', [PostController::class, 'update']);
Route::delete('post/{post}', [PostController::class, 'destroy']);
