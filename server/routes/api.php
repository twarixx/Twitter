<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [UserController::class, 'login']);

Route::get('users', [UserController::class, 'index']);
Route::get('user/{user}', [UserController::class, 'show']);
Route::post('user', [UserController::class, 'store']);
Route::put('user/{user}', [UserController::class, 'update']);
Route::delete('user/{user}', [UserController::class, 'destroy']);

Route::get('post', [PostController::class, 'index']);
Route::get('post/{post}', [PostController::class, 'show']);
Route::post('post', [PostController::class, 'store']);
Route::put('post/{post}', [PostController::class, 'update']);
Route::delete('post/{post}', [PostController::class, 'destroy']);

Route::get('report/{report}', [ReportController::class, 'index']);
Route::post('report', [ReportController::class, 'store']);
Route::put('report/{report}', [ReportController::class, 'update']);
Route::delete('report/{report}', [ReportController::class, 'destroy']);

Route::get('like/{like}', [LikeController::class, 'index']);
Route::post('like', [LikeController::class, 'store']);
Route::put('like/{like}', [LikeController::class, 'update']);
Route::delete('like/{like}', [LikeController::class, 'destroy']);

Route::get('relationship/{relationship}', [RelationshipController::class, 'index']);
Route::post('relationship', [RelationshipController::class, 'store']);
Route::put('relationship/{relationship}', [RelationshipController::class, 'update']);
Route::delete('relationship/{relationship}', [RelationshipController::class, 'destroy']);