#!/bin/bash
# COMPOSE_PROJECT_NAME=react_game_shop_project

if [ ! -f ./docker/.env ]; then
    echo "\nfile not found... \"$(pwd)/docker/.env\" \n"
    echo "Please set environment variables in \"$(pwd)/docker/.env\""
    echo "See \"$(pwd)/docker/.env.example\" \n"
    exit 1
fi

source ./docker/.env

echo "Please wait while service is being destroyed..." \
    && docker compose -p ${COMPOSE_PROJECT_NAME} down \
    && echo "All done"
