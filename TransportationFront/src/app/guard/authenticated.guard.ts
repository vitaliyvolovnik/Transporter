import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {SecurityService} from "../service/security.service";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class AuthenticatedGuard implements CanActivate{

  constructor(private securityService:SecurityService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.securityService.isAuthenticated()){
      return true;
    }
    else{
      return this.router.createUrlTree(['/login'])
    }
  }

}
