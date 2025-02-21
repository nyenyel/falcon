<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('book', BookController::class);
Route::post('add-genre', [BookController::class, 'addGenre']);
Route::get('get-genre', [BookController::class, 'getGenre']);
Route::post('search', [SearchController::class, 'search']);
