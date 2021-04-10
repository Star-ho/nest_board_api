import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { Board } from "./entity/board.entity"
import { Users } from "./entity/users.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GoogleAuthGuard } from './auth/google-auth.guard';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';


@Module({
  imports: [BoardModule,TypeOrmModule.forRoot({//DB와 연결을 위한 모듈 임포트
    "type": "mysql", 
    "host": process.env.DB_Host||"localhost", 
    "port": 3306,
    "username": "root", 
    "password": "boardjs",
    "database": "board_api",
    "entities": [Board,Users], 
    "logging": true, 
    "synchronize": true 
  }
   ),ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'static'),
  }), 
  UsersModule, AuthModule],//다른 모듈과 의존성을 위한 import
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService,JwtAuthGuard,GoogleAuthGuard],
})
export class AppModule {}
