FROM node:14

WORKDIR /usr/src/app

COPY package-backend.json ./package.json
COPY ./package-lock-backend.json ./package-lock.json
COPY ./environment.yaml ./
COPY ./services-account.json ./
COPY ./out ./

RUN npm i --production

EXPOSE 5000

ENTRYPOINT ["node", "main.js"]
