<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request){
        $query = Book::query();

        //filtering by title or author
        if($request->filled('word')){ 
            $search = $request->input('word');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('author', 'LIKE', "%{$search}%");
            });
        }

        //getting the selected genre
        if($request->filled('genres')){
            $arrayOfGenre = explode(',', $request->input('genres'));
            $query->whereIn('genre_id', $arrayOfGenre);
        }

        //sorting them by date
        $sort = $request->input('sort', 'desc');
        //avoid user input error for sorting
        $sort = $sort !== "asc" ? "desc" : $sort;
        $query->orderBy('date_publish', $sort);

        return BookResource::collection($query->with('genre')->get());
    }
}
