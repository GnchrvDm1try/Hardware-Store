import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProductBaseModule } from './components/product-base/product-base.module';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { JwtExpirationInterceptor } from './interceptors/jwt-expiration.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CredentialsComponent } from './components/profile-base/credentials/credentials.component';
import { OrderListComponent } from './components/profile-base/order-list/order-list.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterBarComponent,
    RegisterComponent,
    LoginComponent,
    CredentialsComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Products', pathMatch: 'full' },
      { path: 'Registration', component: RegisterComponent },
      { path: 'Login', component: LoginComponent },
      {
        path: 'Profile',
        component: CredentialsComponent,
        children: [{ path: 'Orders', component: OrderListComponent }],
        canActivate: [AuthGuard]
      }
    ]),
    ProductBaseModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains
      }
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtExpirationInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
