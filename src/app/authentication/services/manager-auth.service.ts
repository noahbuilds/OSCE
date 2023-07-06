import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SignIn } from "../model/sign-in";
import { ManagerAccount } from "../model/manager-account";
import { map, mergeMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { ManagerAccountService } from "./manager-account.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthService {

  constructor( private http: HttpClient, private managerAcctService: ManagerAccountService) { }

  login(signInModel: SignIn): Observable<ManagerAccount>{

    const loginData =
    `username=${encodeURIComponent(signInModel.username)}` +
    `&password=${encodeURIComponent(signInModel.password)}` +
    "&submit=Login";

  const headers = new HttpHeaders().set(
    "Content-Type",
    "application/x-www-form-urlencoded"
  );

  return this.http.post (
    `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/authentication`,
    loginData,
    { headers, withCredentials: true }
  )
  .pipe(mergeMap(() => this.getLoggedInAccount()));
  }

  getLoggedInAccount(): Observable<ManagerAccount> {
    return this.http.get<ManagerAccount>(
      `http://${environment.developmentIP}/caosce/examdelivery/api/exammanager/account`,
      { withCredentials: true }
    ).pipe(
      map((value)=>{
         this.managerAcctService.setCurrentUser(value);
        // console.log(value)
          return value
      })
    )
  }

  logout(): Observable<string>{
    return this.http.get<string>(`
    http://${environment.developmentIP}/caosce/examdelivery/api/logout`,
     {withCredentials: true})
  }
}
