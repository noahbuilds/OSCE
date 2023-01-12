import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from "../model/sign-in";
import { Account } from "../model/account.model";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ExaminerAuthService {
  constructor(private http: HttpClient) {}

  login(signInModel: SignIn): Observable<Account> {
    const loginData =
      `username=${encodeURIComponent(signInModel.username)}` +
      `&password=${encodeURIComponent(signInModel.password)}` +
      "&submit=Login";

    const headers = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    return this.http
      .post(
        `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/authentication`,
        loginData,
        { headers, responseType: "text", withCredentials: true }
      )
      .pipe(mergeMap(() => this.getLoggedInAccount()));
  }

  getLoggedInAccount(): Observable<Account> {
    return this.http.get<Account>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/account`,
      { withCredentials: true }
    );
  }
}
