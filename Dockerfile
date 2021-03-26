FROM node:13.7

WORKDIR /app
COPY . /app

RUN npm install

RUN npm i -g @nestjs/cli

RUN npm install @nestjs/typeorm typeorm mysql2 @types/redis redis  express-session express-mysql-session

CMD [ "npm", "run", "start:dev" ]