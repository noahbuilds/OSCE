import { Injectable } from '@angular/core';

import { CandidateAccount } from '../model/candidate-account';

@Injectable({
  providedIn: 'root'
})
export class CandidateAccountService {
  currentUser: CandidateAccount

  constructor() { }
  setCurrentUser(user:CandidateAccount){
     this.currentUser = user
  }

  getUser(): CandidateAccount{
    return this.currentUser
  }

  
}
