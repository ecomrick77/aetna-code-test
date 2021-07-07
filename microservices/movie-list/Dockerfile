FROM node:14.16-buster
WORKDIR /app
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install

COPY ./ .
