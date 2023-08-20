#!/bin/sh

php artisan serve --host=0.0.0.0
php artisan migrate
php artisan fetch:news
