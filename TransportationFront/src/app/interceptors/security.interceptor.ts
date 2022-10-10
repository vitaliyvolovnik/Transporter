import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {SecurityService} from "../service/security.service";
import {Observable, tap} from "rxjs";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private securityService: SecurityService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap({
      error: error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.securityService.logout()
          } else if (error.status === 403) {
            this.router.navigate(["/login"])
          }
        }
      }
    }));
  }

}
