FROM node:10.12-alpine

RUN apk add --update --no-cache alpine-sdk git python openssl curl bash && \
  rm -rf /tmp/* /var/cache/apk/*

RUN npm i -g nodemon

USER node

RUN mkdir /home/node/api
WORKDIR /home/node/api

COPY package.json package.json

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc && \
  npm i && \
  rm ~/.npmrc

COPY . /home/node/api

EXPOSE 3000 

CMD nodemon run.js
