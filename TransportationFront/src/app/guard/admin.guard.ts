import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {SecurityService} from "../service/security.service";
import {Observable} from "rxjs";
import {Role} from "@api/models/enums/Role";


@Injectable({providedIn: "root"})
export class AdminGuard implements CanActivate{

  constructor(private securityService:SecurityService,
              private router:Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.securityService.hasRole(Role.ADMIN)){
      return true;
    }
    else{
      return this.router.createUrlTree(['/'])
    }
  }

}
