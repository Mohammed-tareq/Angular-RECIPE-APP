// import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
// import { AuthService } from '../servies/auth/auth.service';

// export class AuthGurad implements CanActivate{

//   constructor(private authService: AuthService) {}


//   canActivate():boolean {
//     if(this.authService.isLoggedIn()) {
//       return true;
//     }else {
//       alert("You are not allowed to view this page, please login first");
//       return false;
//     }

    
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../servies/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}