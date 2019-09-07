# build & code linting stage
FROM node:11.7 as builder
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./.babelrc ./
RUN npm ci
COPY ./src ./src
COPY ./contracts/test ./contracts/test
COPY ./README.md .
COPY ./.eslintrc.js ./.prettierrc.js ./.markdownlint.json ./.soliumrc.json ./
RUN npm run validate
RUN npm run build

# truffle build stage
FROM ajmay/truffle:5.0.9 as truffle-builder
COPY ./contracts ./contracts
COPY ./truffle/package.json ./truffle/package-lock.json ./
ENV SOLC_VERSION ^0.5.5
RUN npm ci
RUN truffle compile --all

# api testing stage
FROM node:11.7
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=truffle-builder /truffle/build/contracts ./build/contracts
COPY ./package.json ./
RUN npm run test:ci

# production image stage
FROM node:11.7
RUN mkdir /app
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci --only=prod
COPY --from=builder /app/build ./build
COPY --from=truffle-builder /truffle/build/contracts ./build/contracts
EXPOSE 80
CMD npm start
