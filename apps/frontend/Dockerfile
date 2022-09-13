FROM node:14

CMD npm run build-frontend

WORKDIR /frontend

COPY ./build ./

RUN npm i --production

EXPOSE 3000
CMD ["npx", "next", "start"]
