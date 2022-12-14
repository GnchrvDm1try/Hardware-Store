import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', '../../../../styles/forms.css']
})
export class EditComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string | undefined;
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
      this.form = this.getFormGroupInstance();
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (!this.form.get('password')?.value || !this.form.get('passwordConfirm')?.value) {
      this.form.get('password')?.setValue(null);
      this.form.get('passwordConfirm')?.setValue(null);
    }

    this.userService.updateUserCredentials(this.form)
      .then(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigateByUrl('Profile/Edit'))
      })
      .catch((HTTPError: HttpErrorResponse) => {
        if (HTTPError.status === 400) {
          try {
            let errors = JSON.parse(HTTPError.error).errors
            this.errorMessage = '';
            for (var key in errors)
              if (errors.hasOwnProperty(key)) this.errorMessage += ' ' + errors[key];
          }
          catch (e) {
            this.errorMessage = HTTPError.error;
          }
        }
        else this.errorMessage = "Unknown error occurred";
      });
  }

  private getFormGroupInstance() {
    let registrationForm: FormGroup;
    registrationForm = this.formBuilder.group({
      firstName: new FormControl(this.user.firstname, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      lastName: new FormControl(this.user.lastname, [Validators.required, Validators.minLength(2), Validators.pattern("^[a-zA-Z]([a-zA-Z]| |-|')*$")]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phonenumber, [Validators.minLength(7), Validators.maxLength(16), Validators.pattern("^\\+\\d{6,15}$")]),
      birthDate: new FormControl(`${this.user.birthdate.year}-${this.user.birthdate.month}-${this.user.birthdate.day}`, Validators.required),
      sex: new FormControl(this.user.sex, [Validators.required, Validators.pattern("male|female")]),
      address: new FormControl(this.user.address, Validators.minLength(7)),
      password: new FormControl('', [Validators.minLength(8), Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&_])[A-Za-z\\d@$!%*#?&_]{8,}$")]),
      passwordConfirm: new FormControl('')
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
