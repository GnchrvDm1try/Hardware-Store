import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http: HttpClient;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/account";

  constructor(http: HttpClient) {
    this.http = http;
  }

  register(form: FormGroup) {
    return this.http.post(this.APIUrl + "/register", form.getRawValue());
  }

  login(form: FormGroup) {
    return this.http.post(this.APIUrl + "/login", form.getRawValue());
  }
}
