import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateAuthService } from '../services/candidate-auth.service';
import { UtilitiesService } from 'src/app/pages/candidate/services/utilities.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.scss']
})
export class CandidateLoginComponent implements OnInit {
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

 constructor(private formBuilder: FormBuilder, 
  private router:Router,
  private candidateAuthService: CandidateAuthService,
  private utilitiesService: UtilitiesService,
  private readonly notifierService: NotifierService
  ) { }

 ngOnInit(): void {
   /**
    * Form Validatyion
    */
    this.loginForm = this.formBuilder.group({
     username: ['', [Validators.required]],
   });
   this.utilitiesService.isExamStarted =false
   this.utilitiesService.isExamEnded =false
 }

 // convenience getter for easy access to form fields
 get f() { return this.loginForm.controls; }

 /**
  * Form submit
  */
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
  .navigate(['/candidate/login'])
  .catch((reason) => console.log(reason));

  // stop here if form is invalid
  if (this.loginForm.invalid) {
    this.submitted = false;
  } else {

    let signIn = {username: this.loginForm.value.username,password:this.loginForm.value.username}
    this.candidateAuthService.login(signIn).subscribe(
      (value) => {
        //todo: navigate
        // console.log(value);
        this.router
          .navigate(['/candidate/instruction'])
          .catch((reason) => console.log(reason));
      },
      (err: HttpErrorResponse) => {
        //todo: show error
        this.error = true;
        this.error_msg = err.error.message;
        this.submitted = false;
        this.notifierService.notify("error", err.error.message)
      }
    );
  }
}

 toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

}
