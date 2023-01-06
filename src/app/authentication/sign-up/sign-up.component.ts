import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // Login Form
  SignupForm!: FormGroup;
  submitted = false;
  processing = false;
  // set the current year
  year: number = new Date().getFullYear();
  // Carousel navigation arrow show
  showNavigationArrows: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: AuthenticationService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.SignupForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required]],
      username: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      organizationName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.SignupForm.controls;
  }

  /**
   * Form submit
   */
  onSubmit(form: any) {
    this.submitted = true;
    this.processing = true;
    // stop here if form is invalid
    if (this.SignupForm.invalid) {
      this.processing = false;
      return;
    }

    console.log(form.value);

    this.httpService.registerOrganization(form.value).subscribe(
      (value) => {
        console.log(value);
        this.notifier.notify('success', 'Congratulations, your account was created successfully!');
        this.submitted = false;
        this.processing = false
      },
      (err: HttpErrorResponse) => {
        console.log(err.status);
        this.notifier.notify('error', `${err}`);
        this.submitted = false;
        this.processing = false;
      }
    );
  }
}
