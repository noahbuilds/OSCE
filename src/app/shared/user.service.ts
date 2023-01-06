import { Injectable } from '@angular/core';
import {Account} from "../authentication/model/account.model";
import {Role} from "./enum/role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser? : Account ;

  constructor() { }

  setCurrentUser(account : Account){

      this.currentUser = account;
  }

  getCurrentUser() : Account{
      return this.currentUser;
  }

  getUserRole() : Role{

      if(this.currentUser != null)
        return this.currentUser.authority;
      else
        return null;
  }

  hasRole(role: Role) : boolean{

      if(this.currentUser != null){
          if(this.currentUser.authority == role){
              return true
          }
      }

      return false;

  }
}
