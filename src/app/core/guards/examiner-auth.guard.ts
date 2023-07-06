import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ExaminerAccountService } from 'src/app/authentication/services/examiner-account.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminerAuthGuard implements CanActivate {
  constructor (private examinerAccountService: ExaminerAccountService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if(this.examinerAccountService.currentUser != null){
        return true;
      }
      else{
        this.router.navigate(['examiner/login'])
        return false
      }
   
  }
  
}
