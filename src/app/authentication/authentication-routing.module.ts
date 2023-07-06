import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { ExaminerLoginComponent } from './examiner-login/examiner-login.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'candidate', redirectTo: '/candidate/login', pathMatch: 'full'},
  {path: 'examiner', redirectTo: '/examiner/login', pathMatch: 'full'},
  {path: 'manager', redirectTo: '/manager/login', pathMatch: 'full'},
  {path:'candidate/login', component: CandidateLoginComponent},
  {path: 'manager/login', component: ManagerLoginComponent},
  {path: 'examiner/login', component: ExaminerLoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
