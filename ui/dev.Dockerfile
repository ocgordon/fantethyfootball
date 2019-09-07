FROM node:10.5.0

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./public ./src ./

RUN npm install

EXPOSE 4201
CMD npm start
