import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //  Add the JWT token (Local Storage) Request

    //  Set authrequest as request
    let authReq = req;

    //  Take the Token from getToken()
    const token = this.login.getToken();

    //  Check if the token is not empty then
    if (token != null) {
      //  Authrequest the clone
      authReq = authReq.clone({
        //  Set the Header with Authorization..and Token Start With Bearer and Set the token value
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
