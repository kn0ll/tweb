FROM node:18

RUN apt-get update
RUN apt-get install -y vim ruby-dev
RUN gem install bundler
RUN npm install -g pnpm@7.25.0

COPY . .