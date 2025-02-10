#
# Copyright (C) Zetafence 2021-2025
#
# Dockerfile for starting uiserver using yarn
#

FROM node:18-alpine

ENV NODE_ENV development
ENV HTTPS true

WORKDIR /app

COPY package.json yarn.lock .
COPY public/ /public/
COPY src/ /src/

RUN yarn install --ignore-engines --frozen-lockfile --network-timeout 100000

COPY . .

RUN echo "fs.inotify.max_user_watches=524288" >> /etc/sysctl.conf && sysctl -p || true

EXPOSE 3000

RUN unset NODE_OPTIONS

CMD ["yarn", "dev"]
