import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly http: HttpClient;
  private readonly APIUrl: string = environment.baseAPIUrl + '/api/search';

  constructor(http: HttpClient) {
    this.http = http;
  }

  search(value: string) {
    return this.http.get(this.APIUrl, {params: {'value': value}});
  }
}
