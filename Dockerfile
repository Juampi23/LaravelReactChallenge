# Dockerfile
FROM php:8.3-fpm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Install PDO and MySQL extensions
RUN docker-php-ext-install pdo pdo_mysql
