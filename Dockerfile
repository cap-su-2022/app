FROM node:14

WORKDIR /usr/src/app

COPY ./dist/apps/backend .

RUN npm i

COPY ./dist/apps/backend .

EXPOSE 5000

CMD ["node", "main.js"]
