import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy'
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({//Jwt관련 설정, jwt secret, 유효기간(1시간) 설정
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,GoogleStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}