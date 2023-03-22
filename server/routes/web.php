<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});






// call me baby
Route::prefix('api')->group(function() {

    //! posts
    // new post
    Route::get('post/post/{query}', [ApiController::class, 'post_post']);
    // get post
    Route::get('get/post/{query}', [ApiController::class, 'get_post']);
    // get all posts
    Route::get('get/post/*', [ApiController::class, 'get_post_all']);
    // update post
    Route::get('put/post/{query}', [ApiController::class, 'put_post']);
    // delete post
    Route::get('delete/post/{query}', [ApiController::class, 'delete_post']);

    //! users
    // new user
    Route::get('post/user/{query}', [ApiController::class, 'post_user']);
    // get user
    Route::get('get/user/{query}', [ApiController::class, 'get_user']);
    // get all users
    Route::get('get/user/*', [ApiController::class, 'get_user_all']);
    // update user
    Route::get('put/user/{query}', [ApiController::class, 'put_user']);
    // delete user
    Route::get('delete/user/{query}', [ApiController::class, 'delete_user']);

    //! follow
    // get list of users THIS user is following
    Route::get('get/follow/{query}', [ApiController::class, 'get_follow']);
    // check if following
    Route::get('get/follow/{query}/{target}', [ApiController::class, 'get_follow']);
    // follow a new user
    Route::get('post/follow/{query}/{target}', [ApiController::class, 'post_follow']);
    // remove a follow
    Route::get('delete/follow/{query}/{target}', [ApiController::class, 'delete_follow']);

});