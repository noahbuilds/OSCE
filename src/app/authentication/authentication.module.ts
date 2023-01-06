import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { CandidateFacialLoginComponent } from './candidate-facial-login/candidate-facial-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

@NgModule({
  declarations: [SignUpComponent, SignInComponent, CandidateLoginComponent, CandidateFacialLoginComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
  ],
})
export class AuthenticationModule {}
