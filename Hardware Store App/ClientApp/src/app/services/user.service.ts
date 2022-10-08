import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient;
  private readonly apiURL: string = environment.baseAPIUrl + "/api/user";
  private user: Observable<any>;

  get currentUser() {
    return this.user;
  }

  constructor(http: HttpClient) {
    this.http = http;
    this.user = this.getCurrentUser();
  }

  getCurrentUser() {
    return this.http.get(this.apiURL + "/currentUser");
  }
}
