<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RelationshipController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('search/{query}', [UserController::class, 'search']);

Route::post('logout', [UserController::class, 'logout']);
Route::post('login', [UserController::class, 'login']);

// voor admin
//TODO Route::get('users', [UserController::class, 'index']);
Route::get('user/{user}', [UserController::class, 'show']);
Route::post('register', [UserController::class, 'store']);
Route::put('user/{user}', [UserController::class, 'update']);
Route::delete('user/{user}', [UserController::class, 'destroy']);

Route::get('relationship/{target}/{type}', [RelationshipController::class, 'update']);











Route::get('posts', [PostController::class, 'index']);
Route::get('posts/user/{user}', [PostController::class, 'index_by_user']);
Route::get('post/{post}', [PostController::class, 'show']);
Route::post('post', [PostController::class, 'store']);
Route::put('post/{post}', [PostController::class, 'update']);
Route::delete('post/{post}', [PostController::class, 'destroy']);

// check welke precies nodig zijn, meerder combineren?
// ik kan bijvoorbeeld een /api/profile/{user} maken, en dan user info, followers, posts laden zodat een profiel in 1x geladen kan worden. Als de token dan ook meegegeven wordt kan ik kijken welke persoon probeert te kijken, dan kan ook de check gebruikt worden of hij niet geblokkeerd is en of het account prive staat.
// - is_following
// - is_blocked
// - is_private
// - posts
// - followers

// Bij het bekijken van je eigen profiel zelfde verhaal, dan kunnen we kijken of de token hetzelfde is als de user die we willen zien. en dan gewoon alles laten zien.
// - followers

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