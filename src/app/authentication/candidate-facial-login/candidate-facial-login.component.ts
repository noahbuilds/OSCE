import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-candidate-facial-login',
  templateUrl: './candidate-facial-login.component.html',
  styleUrls: ['./candidate-facial-login.component.scss']
})
export class CandidateFacialLoginComponent implements OnInit {

// Login Form
lockscreenForm!: FormGroup;
submitted = false;
fieldTextType!: boolean;
error = '';
returnUrl!: string;
// set the current year
year: number = new Date().getFullYear();




constructor(private formBuilder: FormBuilder, private router: Router) { }

ngOnInit(): void {
  
  
}

authenticate(){
  this.router.navigate(['candidate/instruction'])
}

/**
 * Form submit
 */

}

