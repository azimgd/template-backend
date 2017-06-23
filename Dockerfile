FROM node:boron

RUN apt-get update && apt-get install -y netcat

RUN npm -g install babel-cli

# Create app directory
RUN mkdir -p /usr/src/app && chown node /usr/src/app
WORKDIR /usr/src/app

USER node

COPY docker/wait-for /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN npm install

EXPOSE 8080
ENV PORT 8080
CMD ./wait-for --timeout=180 $MYSQL_HOST:3306 -- npm start
