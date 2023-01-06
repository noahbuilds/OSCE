import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CandidateFacialLoginComponent } from './candidate-facial-login/candidate-facial-login.component';
import { CandidateLoginComponent } from './candidate-login/candidate-login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path: 'candidate', redirectTo: '/candidate/login', pathMatch: 'full'},
  // {path:'sign-in', component: SignInComponent},
  // {path:'sign-up', component: SignUpComponent},
  {path:'candidate/login', component: CandidateLoginComponent},
  {path:'candidate/facial-login', component: CandidateFacialLoginComponent},
  {path: 'admin/login', component: AdminLoginComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
