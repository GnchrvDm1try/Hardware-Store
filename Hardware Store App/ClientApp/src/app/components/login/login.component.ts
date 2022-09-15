import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | undefined;

  private readonly service: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  private JWTToken: object = {
    "jwtToken": ""
  };

  constructor(formBuilder: FormBuilder, service: AuthService, router: Router) {
    this.formBuilder = formBuilder;
    this.service = service;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  ngOnInit(): void {
  }

  submit() {
    this.service.login(this.form).subscribe(response => {
      this.JWTToken = response
    });
  }

  private getFormGroupInstance() {
    let loginForm: FormGroup;
    loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
    });
    return loginForm;
  }
}
