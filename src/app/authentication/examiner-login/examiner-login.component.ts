import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ExaminerAuthService } from '../services/examiner-auth.service';

@Component({
  selector: 'app-examiner-login',
  templateUrl: './examiner-login.component.html',
  styleUrls: ['./examiner-login.component.scss']
})
export class ExaminerLoginComponent implements OnInit {
  private readonly notifier: NotifierService;
  // Login Form
  loginForm!: FormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error_msg = '';
  returnUrl!: string;
  notification_error = '';
  // set the current year
  year: number = new Date().getFullYear();
  checkSubmit: boolean = false;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private examinerAuthService: ExaminerAuthService,
    notifierService: NotifierService,
    private router: Router
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  

  onSubmit(): void {
    this.error = false;
    this.error_msg = '';
    this.submitted = true;
    this.checkSubmit = true;
    let whitespace =
      this.loginForm.controls['username'].value.indexOf(' ') >= 0;
    if (whitespace) {
      this.submitted = false;
      this.error = true;
      this.error_msg = 'username is invalid';
      return;
    }
    // console.log(this.loginForm.value);
    this.router
    .navigate(['/examiner/login'])
    .catch((reason) => console.log(reason));

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.submitted = false;
    } else {
      this.examinerAuthService.login(this.loginForm.value).subscribe(
        (value) => {
          //todo: navigate
          // console.log(value);
          this.router
            .navigate(['/examiner/dashboard'])
            .catch((reason) => console.log(reason));
        },
        (err: HttpErrorResponse) => {
          //todo: show error
          this.error = true;
          this.error_msg = err.error.message;
          this.submitted = false;
          this.notifier.notify("error", err.error.message)
          console.log(err.error.message)
        }
      );
    }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
