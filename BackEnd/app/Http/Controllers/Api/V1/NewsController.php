<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return News::all();
    }

    /**
     * Search for news
     */
    public function searchAndFilter(Request $request)
    {
        $keyword = $request->input('keyword');
        $author = $request->input('author');
        $source = $request->input('source');
        $date = $request->input('date');

        $query = News::query();

        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%$keyword%")
                    ->orWhere('description', 'like', "%$keyword%")
                    ->orWhere('content', 'like', "%$keyword%");
            });
        }

        if ($author) {
            $query->where('author', 'like', "%$author%");
        }

        if ($source) {
            $query->where('source', 'like', "%$source%");
        }

        if ($date) {
            $query->whereDate('published_at', $date);
        }

        $news = $query->get();

        return response()->json(['news' => $news]);
    }
}
