#!/bin/bash

# Values set in the shell environment override those set when using the --env-file argument in the CLI
# COMPOSE_PROJECT_NAME=react_game_shop_project
# MYSQL_USER=jkirira
# MYSQL_PASSWORD=password
# MYSQL_DATABASE=game_shop
# MYSQL_ROOT_PASSWORD=root

if [ ! -f ./docker/.env ]; then
    echo "\nfile not found... \"$(pwd)/docker/.env\" \n"
    echo "Please set environment variables in \"$(pwd)/docker/.env\""
    echo "See \"$(pwd)/docker/.env.example\" \n"
    exit 1
fi

source ./docker/.env

BUILDKIT_PROGRESS=plain

echo "Starting installation... \\n" \
&& echo "Starting project... \\n" \
&& docker compose -p ${COMPOSE_PROJECT_NAME} \
                  -f ./docker-compose.yml \
                  up -d --no-recreate \
&& docker compose -p ${COMPOSE_PROJECT_NAME} \
                  exec -T \
                  db \
                  mysql -uroot -p${MYSQL_ROOT_PASSWORD} ${MYSQL_DATABASE} < docker/db/db.sql \
&& echo "\\nInstallation complete :)  \\n"
