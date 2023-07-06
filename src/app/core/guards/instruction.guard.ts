import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExaminerAccountService } from 'src/app/authentication/services/examiner-account.service';

@Injectable({
  providedIn: 'root'
})
export class InstructionGuard implements CanActivate {
  constructor(private examinerAccountService: ExaminerAccountService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(this.examinerAccountService.currentUser.leader == true){
        return true;
      }
      return false
    
  }
  
}
