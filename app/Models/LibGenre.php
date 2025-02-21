<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LibGenre extends Model
{
    protected $guarded = ['id'];
    protected $fillable = [
        'desc'
    ];

    public function book(): HasMany{
        return $this->hasMany(Book::class, 'genre');
    }
}
