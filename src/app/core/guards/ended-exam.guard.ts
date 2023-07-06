import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/pages/candidate/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class EndedExamGuard implements CanActivate {
  constructor(private utilitiesService: UtilitiesService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if(this.utilitiesService.isExamEnded == true){
        return true;
      }
      else{
        return false
      }
   
  }
  
}
