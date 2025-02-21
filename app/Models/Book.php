<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Book extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'title',
        'author',
        'isbn',
        'genre_id',
        'date_publish'
    ];

    public function genre() : BelongsTo {
        return $this->belongsTo(LibGenre::class, 'genre_id');
    }
}
