import { Injectable } from '@angular/core';
import { ExaminerAccount } from '../model/examiner-account';

@Injectable({
  providedIn: 'root'
})
export class ExaminerAccountService {
  currentUser: ExaminerAccount
  constructor() { }

  setCurrentUser(user:ExaminerAccount){
     this.currentUser = user
  }

  getUser(): ExaminerAccount{
    return this.currentUser
  }
}
