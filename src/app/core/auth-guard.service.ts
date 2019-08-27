import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// import our authentication service
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    // if user is not logged in we'll send them to the homepage 
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
