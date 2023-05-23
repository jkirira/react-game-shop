#!/bin/bash

# Values set in the shell environment override those set when using the --env-file argument in the CLI
# COMPOSE_PROJECT_NAME=react_game_shop_project
# MYSQL_USER=jkirira
# MYSQL_PASSWORD=password
# MYSQL_DATABASE=game_shop
# MYSQL_ROOT_PASSWORD=root

if [ ! -f ./docker/.env ]; then
    printf "\nfile not found... \"$(pwd)/docker/.env\" \n"
    printf "Please set environment variables in \"$(pwd)/docker/.env\""
    printf "See \"$(pwd)/docker/.env.example\" \n"
    exit 1
fi

source ./docker/.env

BUILDKIT_PROGRESS=plain

printf "Starting installation... \n" \
&& printf "Starting project... \n" \
&& docker compose -f ./docker-compose.yml \
                  up -d --no-recreate \
&& printf "\nSetting up the database... \n" \
&& sleep 10 \
&& docker compose exec -T \
                  db \
                  mysql -uroot -p${MYSQL_ROOT_PASSWORD} ${MYSQL_DATABASE} < docker/db/db.sql \
&& printf "\nInstallation complete :)  \n"
