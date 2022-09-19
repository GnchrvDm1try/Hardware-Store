import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY, AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class JwtExpirationInterceptor implements HttpInterceptor {
  private readonly authService: AuthService;
  private readonly jwtHelper: JwtHelperService;

  constructor(authService: AuthService, jwtHelper: JwtHelperService) {
    this.authService = authService;
    this.jwtHelper = jwtHelper;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.authService.isUserAuthenticated()) {
      this.authService.logout();
    }
    // console.log(this.authService.isUserAuthenticated());
    return next.handle(request)
  }

}
