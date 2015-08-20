FROM tutum/apache-php
# config to enable .htaccess
ADD apache-default /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite
