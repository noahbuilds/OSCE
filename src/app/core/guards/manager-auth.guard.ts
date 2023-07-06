import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ManagerAccountService } from 'src/app/authentication/services/manager-account.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthGuard implements CanActivate {
  constructor(private managerAccountService: ManagerAccountService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if(this.managerAccountService.currentUser != null){
        return true;
      }
      else{
        this.router.navigate(['manager/login']);
        return false
      }
    
  }
  
}
