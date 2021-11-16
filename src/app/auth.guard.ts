import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Promise<boolean | UrlTree> {
    return this.authService.waitUntilAuth().then(user => {
      return user ? true : this.router.createUrlTree(['/login']);
    });
  }

  canActivateChild() {
    return this.canActivate();
  }
}
