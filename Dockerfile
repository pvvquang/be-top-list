FROM node:16.15.0-alpine
WORKDIR /app
COPY . .

RUN yarn install

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE ${PORT}

CMD /wait && yarn migrate && yarn start