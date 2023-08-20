FROM php:8.1 as php

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Postgre PDO
RUN apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer


# Set working directory
WORKDIR /app
COPY . .
RUN composer install

# Set the environment variable to allow Composer plugins as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Run migrations and start the server
RUN chmod +x run-commands.sh
CMD ["./run-commands.sh"]


EXPOSE 8000
