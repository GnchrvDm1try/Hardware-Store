import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;
  private readonly jwtHelper: JwtHelperService;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/account";

  get userToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private set userToken(newToken: string | null) {
    if (!newToken)
      throw new Error("Token wasn't specified");
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
  }

  constructor(http: HttpClient, jwtHelper: JwtHelperService) {
    this.http = http;
    this.jwtHelper = jwtHelper;
  }

  register(form: FormGroup) {
    return this.http.post(this.APIUrl + "/register", form.getRawValue());
  }

  login(form: FormGroup) {
    return this.http.post(this.APIUrl + "/login", form.getRawValue());
  }

  isUserAuthenticated(): boolean {
    let token: string | null = localStorage.getItem(ACCESS_TOKEN_KEY);
    return (!!token && !this.jwtHelper.isTokenExpired(token)) as boolean;
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
