import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: any;

  private readonly userService: UserService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  private currentDateTime: Date = new Date();
  maxAllowedBirthDate: string = this.currentDateTime.getFullYear() - 6 + "-12" + "-31";
  minAllowedBirthDate: string = this.currentDateTime.getFullYear() - 100 + "-01" + "-01";

  constructor(userService: UserService, formBuilder: FormBuilder, router: Router) {
    this.userService = userService;
    this.formBuilder = formBuilder;
    this.router = router;
    this.userService.currentUser.subscribe(user => {
      this.user = user
    });
  }

  ngOnInit(): void {
  }

}
