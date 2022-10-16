import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN_KEY";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;
  private readonly jwtHelper: JwtHelperService;
  private readonly router: Router;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/account";

  get userToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  private set userToken(newToken: string | null) {
    if (!newToken)
      throw new Error("Token wasn't specified");
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
  }

  constructor(http: HttpClient, jwtHelper: JwtHelperService, router: Router) {
    this.http = http;
    this.jwtHelper = jwtHelper;
    this.router = router;
  }

  async register(form: FormGroup): Promise<boolean | undefined> {
    await this.http.post(this.APIUrl + "/register", form.getRawValue(), { observe: "response", responseType: "text" as "json" }).toPromise();
    return this.http.get<boolean>(this.APIUrl + `/isUserExists/${form.get('email')?.value}`).toPromise();
  }

  async login(form: FormGroup): Promise<boolean> {
    await this.http.post<string>(this.APIUrl + "/login", form.getRawValue(), { responseType: "text" as "json" }).pipe(tap(token => this.userToken = token)).toPromise();
    return !!this.userToken && !this.jwtHelper.isTokenExpired(this.userToken);
  }

  isUserAuthenticated(): boolean {
    let token: string | null = this.userToken;
    return (!!token && !this.jwtHelper.isTokenExpired(token)) as boolean;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
