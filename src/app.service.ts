import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';


@Injectable()
export class AppService {
  constructor(private authService: AuthService){}
     async googleLogin(req) {
      console.log(req.user,23)
      if (req.user=='fail') {
        return `<html><body>
        <script>
        alert('이메일을 등록해주세요')
        location.href='/';
        </script>
        </body></html>`
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
