import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwt: string | null = this.authService.userToken;
    if (jwt) {
      return next.handle(request.clone({
        headers: request.headers.set('Authorization', `Bearer ${jwt}`)
      }));
    }
    else return next.handle(request);
  }
}
