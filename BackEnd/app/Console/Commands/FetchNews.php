<?php

namespace App\Console\Commands;

use App\Models\News;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:news';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $newsApiUrl = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" . env('NEWSAPI_API_KEY');
        $guardianApiUrl = "https://newsapi.org/v2/top-headlines?sources=the-washington-post&apiKey=" . env('NEWSAPI_API_KEY');
        $bbcApiUrl = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=" . env('NEWSAPI_API_KEY');

        $newsApiResponse = Http::get($newsApiUrl)->json();
        $guardianApiResponse = Http::get($guardianApiUrl)->json();
        $bbcApiResponse = Http::get($bbcApiUrl)->json();

        $processedData = [];

        foreach ($newsApiResponse['articles'] as $article) {
            $processedData[] = [
                "source" => "News.ORG",
                "author" => $article['author'],
                "title" => $article['title'],
                "description" => $article['description'],
                "url" => $article['url'],
                "imageUrl" => $article['urlToImage'],
                "publishedAt" => $article['publishedAt'],
                "content" => $article['content']
            ];
        }

        foreach ($guardianApiResponse['articles'] as $article) {
            $processedData[] = [
                "source" => "Guardian News",
                "author" => $article['author'],
                "title" => $article['title'],
                "description" => $article['description'],
                "url" => $article['url'],
                "imageUrl" => $article['urlToImage'],
                "publishedAt" => $article['publishedAt'],
                "content" => $article['content']
            ];
        }

        foreach ($bbcApiResponse['articles'] as $article) {
            $processedData[] = [
                "source" => "BBC News",
                "author" => $article['author'],
                "title" => $article['title'],
                "description" => $article['description'],
                "url" => $article['url'],
                "imageUrl" => $article['urlToImage'],
                "publishedAt" => $article['publishedAt'],
                "content" => $article['content']
            ];
        }

        foreach ($processedData as $articleData) {
            News::create($articleData);
        }
    }
}
