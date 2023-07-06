import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/pages/candidate/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class StartedExamGuard implements CanActivate {
  constructor(private utilitiesService: UtilitiesService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if(this.utilitiesService.isExamStarted == true){
        return true;
      }
      else{
        this.router.navigate(['candidate/login'])
        return false
      }
  
  }
  
}
