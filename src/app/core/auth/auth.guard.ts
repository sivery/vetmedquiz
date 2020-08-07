import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { AuthService } from './auth.service';
import { userError } from '@angular/compiler-cli/src/transformers/util';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): Observable<boolean>|boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    return true; /*this.authService.login().pipe(map(user => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));*/
  }
}
