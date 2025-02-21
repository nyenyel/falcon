<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\LibGenre;
use Illuminate\Http\Request;
use League\CommonMark\Exception\IOException;

class BookController extends Controller
{
    protected $relation = [
        'genre'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //gets all data
        return BookResource::collection(Book::all()->load($this->relation));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        //add new data
        $newBook = Book::create($request->validated());
        $newBook->load($this->relation);
        return BookResource::make($newBook);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //get a single data using their id
        $data = $book->load($this->relation);
        return BookResource::make($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BookRequest $request, Book $book)
    {
        //updating selected data
        $book->update($request->validated());
        return BookResource::make($book->load($this->relation));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        try{
            //deletiing data
            $book->delete();
            return response()->json(['message' => 'Data Deleted']);
        } catch (IOException $e){
            //catching error if ever some problem occurs
            return response()->json(['message' => `Failed to delete data due to: $e}`]);
        }
    }

    public function addGenre(Request $request){
        //adding a genre to the database

        //inline validation of required content of the request
        $validated = $request->validate(['desc' => 'required|string']);

        //adding the new genre to a different table
        $data = LibGenre::create($validated);
        return response()->json(['message' => 'New Genre Added']);
    }
}
