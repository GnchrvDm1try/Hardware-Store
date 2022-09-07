import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  private currentDateTime: Date = new Date();
  maxAllowedBirthDate: string = this.currentDateTime.getFullYear() - 6 + "-12" + "-31";
  minAllowedBirthDate: string = this.currentDateTime.getFullYear() - 100 + "-01" + "-01";

  constructor(private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.minLength(7), Validators.maxLength(16), Validators.pattern("^\\+\\d{6,15}$")]),
      birthDate: new FormControl(null, Validators.required),
      sex: new FormControl(null, [Validators.required, Validators.pattern("male|female")]),
      address: new FormControl(null, Validators.minLength(7)),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$")]),
      passwordConfirm: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  logFormControls(): void {
    console.log(this.form.value);
    console.log(this.form.getRawValue());
  }
}
