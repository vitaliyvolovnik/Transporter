import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {SecurityService} from "../service/security.service";


@Injectable({providedIn: "root"})
export class NotAuthenticatedGuard implements CanActivate{

  constructor(private securityService:SecurityService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   if(!this.securityService.isAuthenticated()){
     return true;
   }
   else{
     return this.router.createUrlTree(['/'])
   }
  }

}
