import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from 'src/app/pages/candidate/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DisableBackButtonGuard implements CanDeactivate<unknown> {
  constructor (private utilitiesService: UtilitiesService){}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot){
    if(this.utilitiesService.isExamEnded == true){
      return true;
    }
    return false
      
  }
  
}
