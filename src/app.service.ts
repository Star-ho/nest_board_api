import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  toBoardService(): string {
    return '<html><body><a href="/board/">board service</a> </body></html>';//클릭시 /board/로 이동
  }
}
