import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http: HttpClient;
  private readonly apiURL: string = environment.baseAPIUrl + "api/user";

  constructor(http: HttpClient) {
    this.http = http;
  }
}
