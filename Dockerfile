FROM node:13-slim

WORKDIR /usr/app

COPY ./ ./

RUN npm install

CMD [ "npm", "start" ]