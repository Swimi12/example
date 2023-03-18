import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

Injectable();
export class AuthGuard implements CanActivate {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthentificated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
