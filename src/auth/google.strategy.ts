import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: '771606542006-4cjjjkh3m86ittptde74e3h07puru2pe.apps.googleusercontent.com',
      clientSecret: '0M3FVIlbqFeeFJ7GfGTwYZfp',
      callbackURL: 'http://localhost:3000/auth/login/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile
    /*
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }*/
    const user = await this.authService.validateUser(emails[0].value);
    if (!user) {
      throw new UnauthorizedException();
    }
    done(null, user);
  }
}