import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { CandidateLoginComponent } from "./candidate-login/candidate-login.component";
import { ExaminerLoginComponent } from "./examiner-login/examiner-login.component";
import { ManagerLoginComponent } from "./manager-login/manager-login.component";


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    CandidateLoginComponent,
    ExaminerLoginComponent,
    ManagerLoginComponent,
   
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
  ],
})
export class AuthenticationModule {}
