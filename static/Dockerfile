FROM mysql:8.0
LABEL authors="seoyongmin"
ENV MYSQL_ROOT_PASSWORD=123
ENV MYSQL_DATABASE=untity
COPY backup2.sql /docker-entrypoint-initdb.d/
EXPOSE 3306
