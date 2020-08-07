import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
// import { UserVO } from '@app/shared/client';
// import { UserService } from '@app/shared/client';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private currentUserSubject: BehaviorSubject<UserVO>;
  // public currentUser: Observable<UserVO>;
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // constructor(private userService: UserService) {
  //   this.currentUserSubject = new BehaviorSubject<UserVO>(JSON.parse(localStorage.getItem('currentUser')));
  //   this.currentUser = this.currentUserSubject.asObservable();
  // }

  login() {
    // return this.userService.getAuthenticatedUser()
    //   .pipe(map(user => {
    //     if (user) {
    //       if (!localStorage.getItem('currentUser' ) || JSON.parse(localStorage.getItem('currentUser' )).id !== user.id) {
    //         localStorage.setItem('edition', JSON.stringify(user));
    //       }
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //
    //     return user;
    //   }));
  }

  logout(): Observable<any> {
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    // return this.userService.lgout();
    return null;
  }
}
