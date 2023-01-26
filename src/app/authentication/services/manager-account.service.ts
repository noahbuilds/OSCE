import { Injectable } from '@angular/core';
import { ManagerAccount } from '../model/manager-account';

@Injectable({
  providedIn: 'root'
})
export class ManagerAccountService {
currentUser: ManagerAccount
  constructor() { }

  setCurrentUser(user:ManagerAccount){
     this.currentUser = user
  }

  getUser(): ManagerAccount{
    return this.currentUser
  }

  setExamId(examId: string){
    this.currentUser.examId = examId
  }
}
