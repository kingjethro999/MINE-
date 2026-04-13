FROM postgres:16-alpine
ENV POSTGRES_DB=mines_db
ENV POSTGRES_USER=mines_user
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
COPY init.sql /docker-entrypoint-initdb.d/init.sql
EXPOSE 5432
