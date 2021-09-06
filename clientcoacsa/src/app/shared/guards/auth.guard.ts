import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


import { AuthService } from "./../../services/auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.authService.isLogged.pipe(
      take(1), 
      map((isLogged: boolean) => !isLogged));
  }

}
