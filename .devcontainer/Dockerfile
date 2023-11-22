FROM node:18

ARG workdir

WORKDIR ${workdir}

RUN apt-get update
RUN apt-get install -y vim ruby
RUN npm install -g pnpm@7.25.0

COPY . .