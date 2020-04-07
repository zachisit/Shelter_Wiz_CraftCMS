FROM 722299012016.dkr.ecr.us-east-1.amazonaws.com/hc-nginx-php:7.4

ENV DEBIAN_FRONTEND noninteractive

# Keep it in this order...
RUN apt-get update && apt-get install -y \
	php-imagick \
	gifsicle \
	webp \
	optipng \
	jpegoptim \
	mysql-client \
	php-gmp \
	php-bcmath \
	zip \
	unzip

RUN composer global require hirak/prestissimo
