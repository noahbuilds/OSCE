import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.scss']
})
export class CandidateLoginComponent implements OnInit {
 // Login Form
 loginForm!: FormGroup;
 submitted = false;
 error = '';
 returnUrl!: string;
 // set the current year
 year: number = new Date().getFullYear();

 constructor(private formBuilder: FormBuilder, private router:Router) { }

 ngOnInit(): void {
   /**
    * Form Validatyion
    */
    this.loginForm = this.formBuilder.group({
     examNumber: ['', [Validators.required]],
   });
 }

 // convenience getter for easy access to form fields
 get f() { return this.loginForm.controls; }

 /**
  * Form submit
  */
  onSubmit() {
   this.submitted = true;
  
   console.log(this.loginForm.valid)
   // stop here if form is invalid
   if (this.loginForm.invalid) {
     return;
   }
   if(this.loginForm.valid){
    this.router.navigate(['candidate/instruction'])
   }

 }



}
