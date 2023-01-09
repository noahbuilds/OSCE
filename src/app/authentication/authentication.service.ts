import { map, mergeMap } from 'rxjs/operators';
import { Account } from './model/account.model';
import { SignUp } from './sign-up/model/sign-up';
import { environment } from './../../environments/environment';
import { ResourceCreated } from './../shared/model/resource-created';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignIn } from './sign-in/model/sign-in';
import { Role } from '../shared/enum/role';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private userService: UserService) {}

  // registerOrganization(signupModel: SignUp): Observable<ResourceCreated> {
  //   return this.http.post<ResourceCreated>(
  //     `http://${environment.developmentIP}/itembank/api/register`,
  //     signupModel
  //   );
  // }

  // login(signInModel: SignIn): Observable<Account> {
  //   const data =
  //     `username=${encodeURIComponent(signInModel.username)}` +
  //     `&password=${encodeURIComponent(signInModel.password)}` +
  //     //`&remember-me=${credentials.rememberMe ? 'true' : 'false'}` +
  //     '&submit=Login';

  //   // console.log(data);

  //   const headers = new HttpHeaders().set(
  //     'Content-Type',
  //     'application/x-www-form-urlencoded'
  //   );

  //   return this.http
  //     .post(
  //       `http://${environment.developmentIP}/itembank/api/authentication`,
  //       data,
  //       { headers, responseType: 'text', withCredentials: true }
  //     )
  //     .pipe(mergeMap(() => this.getLoggedInAccount()));
  // }

  // getLoggedInAccount(): Observable<Account> {
  //   return this.http
  //     .get<Account>(
  //       `http://${environment.developmentIP}/itembank/api/account`,
  //       { withCredentials: true }
  //     )
  //     .pipe(
  //       map((value) => {
  //         value.authority = Role[value.authorities[0]];

  //         this.userService.setCurrentUser(value);
  //         return value;
  //       })
  //     );
  // }

  // userLogin(signInModel: SignIn): Observable<Account> {
  //   return this.login(signInModel).pipe(
  //     mergeMap(() => this.getLoggedInAccount())
  //   );
  // }
}
