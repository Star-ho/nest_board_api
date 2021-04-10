FROM node:13.7

WORKDIR /app
COPY . /app

RUN npm install

RUN npm i -g @nestjs/cli
RUN npm i -D @types/bcrypt
RUN npm install @nestjs/typeorm typeorm mysql2 @types/redis redis  express-session express-mysql-session bcrypt 

RUN npm install --save @nestjs/passport passport passport-local @types/passport-local @nestjs/jwt passport-jwt @types/passport-jwt passport-google-oauth20 dotenv @nestjs/serve-static


RUN npm install -D @types/passport-google-oauth20

CMD [ "npm", "run", "start" ]



