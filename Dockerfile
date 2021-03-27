FROM node:13.7

WORKDIR /app
COPY . /app

RUN npm install

RUN npm i -g @nestjs/cli

RUN npm install @nestjs/typeorm typeorm mysql2 @types/redis redis  express-session express-mysql-session

RUN npm install --save @nestjs/passport passport passport-local

RUN npm install --save @types/passport-local

RUN npm install --save @nestjs/jwt passport-jwt

RUN npm install --save @types/passport-jwt

CMD [ "npm", "run", "start:dev" ]