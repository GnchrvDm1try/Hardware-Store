import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductBaseModule } from './components/product-base/product-base.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SearchBarComponent } from "./components/nav-bar/search-bar/search-bar.component";
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { JwtExpirationInterceptor } from './interceptors/jwt-expiration.interceptor';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileBaseModule } from './components/profile-base/profile-base.module';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    FooterBarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Products', pathMatch: 'full' },
      { path: 'Registration', component: RegisterComponent, canActivate: [AuthenticatedGuard] },
      { path: 'Login', component: LoginComponent, canActivate: [AuthenticatedGuard] }
    ]),
    ProfileBaseModule,
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
