import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let url;
    if (process.env.NODE_ENV == 'prod') {
      url = `http://user.service.solutioncore.com.br/user/username/${username}`;
    } else {
      url = `http://tst.user.service.solutioncore.com.br/user/username/${username}`;
    }
    const { data }: any = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError((error: any) => {
          throw 'An error happened!';
        }),
      ),
    );

    if (data && data.password === pass) {
      const { password, ...result } = data;
      return result;
    }
    return null;
  }

  async login(user: any) {
    let url;
    if (process.env.NODE_ENV == 'prod') {
      url = `http://user.service.solutioncore.com.br/user/username/${user.username}`;
    } else {
      url = `http://tst.user.service.solutioncore.com.br/user/username/${user.username}`;
    }
    const { data }: any = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError((error: any) => {
          throw 'An error happened!';
        }),
      ),
    );
    data.password = null;
    const payload = data;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
