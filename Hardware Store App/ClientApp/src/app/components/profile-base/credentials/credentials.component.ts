import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  private readonly userService: UserService;
  user: any;

  get birthDate(): Date {
    return new Date(this.user.birthdate);
  }

  get registrationDate(): Date {
    return new Date(this.user.registrationdate);
  }

  constructor(userService: UserService) {
    this.userService = userService;
    this.userService.currentUser.subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }
}
