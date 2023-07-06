import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CandidateAccountService } from 'src/app/authentication/services/candidate-account.service';

@Injectable({
  providedIn: 'root'
})
export class CandidateAuthGuard implements CanActivate {
  constructor (private candidateAccountService: CandidateAccountService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      if(this.candidateAccountService.currentUser != null){
        return true;
      }else{
        this.router.navigate(['candidate/login'])
        return false
      }

  }
  
}
