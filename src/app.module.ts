import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { Board } from "./entity/board.entity"
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [BoardModule,TypeOrmModule.forRoot({//DB와 연결을 위한 모듈 임포트
    "type": "mysql", 
    "host": "localhost", 
    "port": 3306,
    "username": "node", 
    "password": "boardjs",
    "database": "board",
    "entities": [Board], 
    "logging": true, 
    "synchronize": true 
  }
   ), UsersModule, AuthModule],//board모듈과 연동 위해 board모듈 import
  controllers: [AppController],
  providers: [AppService, UsersService, AuthService],
})
export class AppModule {}
