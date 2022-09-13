FROM node:14
CMD npm run build-backend

WORKDIR /backend

COPY ./dist/ ./

RUN npm i --production

EXPOSE 5000

ENTRYPOINT ["node", "main.js"]
