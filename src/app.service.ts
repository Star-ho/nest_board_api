import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AppService {
  constructor(private authService: AuthService){}
     async googleLogin(req) {
      if (!req.user) {
        return 'No user from google'
      }
      let jwt= await this.authService.login(req.user)

      return `<html><body>
      <script>
      sessionStorage.setItem("token","${jwt.token}");
      location.href='/';
      </script>
      </body></html>`
    }
}
