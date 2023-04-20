<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use Illuminate\Support\Facades\File;

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

// Route::get('/', function () {
// 	return File::get(__DIR__ . '/dist/index.html');
// });

Route::get('/{path?}', function ($path = null) {
    $filePath = __DIR__ . '/dist/' . $path;
    if (is_file($filePath)) {
        return response()->file($filePath);
    } else {
        return response()->file(__DIR__ . '/dist/index.html');
    }
})->where('path', '.*');