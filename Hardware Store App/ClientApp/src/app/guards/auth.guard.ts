import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly router: Router;
  private readonly authService: AuthService;

  constructor(router: Router, authService: AuthService) {
    this.router = router;
    this.authService = authService;
  }

  canActivate(): boolean {
    if (!this.authService.isUserAuthenticated())
      this.router.navigate(["Login"]);
    return true;
  }
}
