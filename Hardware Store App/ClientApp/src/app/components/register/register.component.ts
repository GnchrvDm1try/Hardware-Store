import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../styles/forms.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  private readonly service: AuthService;
  private readonly formBuilder: FormBuilder;
  private readonly router: Router;

  private currentDateTime: Date = new Date();
  maxAllowedBirthDate: string = this.currentDateTime.getFullYear() - 6 + "-12" + "-31";
  minAllowedBirthDate: string = this.currentDateTime.getFullYear() - 100 + "-01" + "-01";


  constructor(formBuilder: FormBuilder, service: AuthService, router: Router) {
    this.formBuilder = formBuilder;
    this.service = service;
    this.router = router;
    this.form = this.getFormGroupInstance();
  }

  ngOnInit(): void {
  }

  submit() {
    this.service.register(this.form).subscribe(response => {
      console.log(response);
    });
    this.router.navigateByUrl("/");
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null, [Validators.minLength(7), Validators.maxLength(16), Validators.pattern("^\\+\\d{6,15}$")]),
      birthDate: new FormControl(null, Validators.required),
      sex: new FormControl(null, [Validators.required, Validators.pattern("male|female")]),
      address: new FormControl(null, Validators.minLength(7)),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl(null, [Validators.required])
    }, { validators: this.matchValidator("password", "passwordConfirm") });
    return registrationForm;
  }

  private matchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
}