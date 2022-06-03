FROM node:16

ARG workdir

WORKDIR ${workdir}

RUN apt-get update
RUN apt-get install -y vim
RUN npm install -g pnpm@7.25.0