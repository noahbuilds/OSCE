import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from "../model/sign-in";
import { ExaminerAccount } from "../model/examiner-account";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ExaminerAccountService } from "./examiner-account.service";

@Injectable({
  providedIn: "root",
})
export class ExaminerAuthService {
  constructor(private http: HttpClient, private examinerAccountService: ExaminerAccountService) {}

  login(signInModel: SignIn): Observable<ExaminerAccount> {
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
        { headers, withCredentials: true }
      )
      .pipe(mergeMap(() => this.getLoggedInAccount()));
  }

  getLoggedInAccount(): Observable<ExaminerAccount> {
    return this.http.get<ExaminerAccount>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/examiner/account`,
      { withCredentials: true }
    ).pipe(
      map((value)=>{
         this.examinerAccountService.setCurrentUser(value);
        // console.log(value)
          return value
      })
    );
  }

  logout(): Observable<string>{
    return this.http.get<string>(`
    http://${environment.developmentIP}/caosce/examdelivery/api/logout`,
     {withCredentials: true})
  }
}
