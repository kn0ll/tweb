FROM node:22

RUN apt-get update
RUN npm install -g pnpm@9.7.1

RUN apt-get install -y vim ruby-dev
RUN gem install bundler

COPY . .
