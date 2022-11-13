import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly http: HttpClient;
  private readonly apiURL: string = environment.baseAPIUrl + "/api/review";

  constructor(http: HttpClient) {
    this.http = http;
  }

  edit(form: FormGroup) {
    return this.http.patch(this.apiURL + '/edit', form.getRawValue(), { observe: "response", responseType: "text" as "json" });
  }

  delete(id: number) {
    return this.http.delete(this.apiURL + '/delete', { body: id, responseType: "text" as "json" });
  }
}
