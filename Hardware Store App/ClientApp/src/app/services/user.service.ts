import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  async updateUserCredentials(form: FormGroup): Promise<boolean> {
    return await this.http.patch(this.apiURL + "/updateUserCredentials", form.getRawValue(), { observe: "response", responseType: "text" as "json" }).toPromise()
      .then(() => true);
  }

  private getCurrentUser() {
    return this.http.get(this.apiURL + "/currentUser");
  }

  updateOrder(form: FormGroup) {
    return this.http.patch(this.apiURL + "/updateOrder", form.getRawValue(), { responseType: "text" as "json" });
  }

  toggleWishlistItem(productId: number) {
    return this.http.post(this.apiURL + "/toggleWishlistItem", productId, { responseType: "text" as "json" });
  }
}
