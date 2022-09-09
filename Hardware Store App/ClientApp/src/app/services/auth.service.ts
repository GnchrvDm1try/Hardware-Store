import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient;
  private readonly APIUrl: string = environment.baseAPIUrl + "/api/account";

  constructor(http: HttpClient) {
    this.http = http;
  }

  register(form: FormGroup): void {
    this.http.post(this.APIUrl + "/register", form.getRawValue()).subscribe(
      response => console.log(response),
      error => console.error(error)
    );
  }
  
  login(form: FormGroup) {
    return this.http.post(this.APIUrl + "/login", form.getRawValue());
  }
}
