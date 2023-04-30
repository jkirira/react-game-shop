FROM node:14-alpine

WORKDIR /react-game-shop

COPY ./package* ./

RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm install

COPY . .

EXPOSE 5173 5000

CMD ["npm", "run", "dev"]
