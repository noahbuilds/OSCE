import { Injectable } from '@angular/core';
import { CandidateAccount } from '../model/candidate-account';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from "../model/sign-in";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { CandidateAccountService } from './candidate-account.service';


@Injectable({
  providedIn: 'root'
})
export class CandidateAuthService {

  constructor(private http: HttpClient, private candidateAccountService: CandidateAccountService) { }

  login(signInModel: SignIn): Observable<CandidateAccount>{

    const loginData =
    `username=${encodeURIComponent(signInModel.username)}` +
    `&password=${encodeURIComponent(signInModel.password)}` +
    "&submit=Login";

  const headers = new HttpHeaders().set(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  return this.http.post (
    `http://${environment.developmentIP}/caosce/examdelivery/api/candidate/authentication`,
    loginData,
    { headers, withCredentials: true }
  )
  .pipe(mergeMap(() => this.getLoggedInAccount()));
  }

  getLoggedInAccount(): Observable<CandidateAccount> {
    return this.http.get<CandidateAccount>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/candidate/account`,
      { withCredentials: true }
    ).pipe(
      map((value)=>{
         this.candidateAccountService.setCurrentUser(value);
        // console.log(value)
          return value
      })
    )
  }

}
