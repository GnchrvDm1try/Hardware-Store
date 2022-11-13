import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', '../../../styles/bar.css']
})
export class NavBarComponent implements OnInit {

  private readonly authService: AuthService;
  private readonly router: Router;

  public get isLoggedIn(): boolean {
    return this.authService.isUserAuthenticated();
  }

  constructor(authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate([""]);
  }
}
