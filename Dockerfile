FROM node:14

WORKDIR /usr/src/app

COPY ./dist/apps/backend .

CMD ["npm", "install"]

EXPOSE 5000

CMD ["node", "main.js"]
