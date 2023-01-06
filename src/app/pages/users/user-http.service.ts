import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppRoleModel} from "./model/app-role-model";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http: HttpClient) { }

  listRoles() : Observable<AppRoleModel[]>{
    return this.http.get<AppRoleModel[]>(``,{withCredentials:true});
  }
}
