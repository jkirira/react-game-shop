#!/bin/bash
# COMPOSE_PROJECT_NAME=react_game_shop_project

if [ ! -f ./docker/.env ]; then
    printf "\nfile not found... \"$(pwd)/docker/.env\" \n"
    printf "Please set environment variables in \"$(pwd)/docker/.env\""
    printf "See \"$(pwd)/docker/.env.example\" \n"
    exit 1
fi

source ./docker/.env

printf "Please wait while service is being destroyed..." \
    && docker compose down \
    && printf "All done"
