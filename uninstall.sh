#!/bin/bash
# COMPOSE_PROJECT_NAME=react_game_shop_project

source ./docker/.env

echo "Please wait while service is being destroyed..." \
    && docker compose -p ${COMPOSE_PROJECT_NAME} down \
    && echo "All done"
