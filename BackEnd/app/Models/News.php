<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'author',
        'title',
        'description',
        'content',
        'url',
        'imageUrl',
        'publishedAt'
    ];
}
