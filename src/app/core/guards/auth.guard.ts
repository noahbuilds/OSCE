import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

// Auth Services
import { UserService } from '../../shared/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.userService.getCurrentUser();
    console.log('in  guard', currentUser);
    if (currentUser != null) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/authenticate/sign-in']);
      return false;
    }
  }
}
