FROM node:14

WORKDIR /usr/src/app

COPY ./dist/apps/backend .

RUN npm i --production

EXPOSE 5000

CMD ["node", "main.js"]
