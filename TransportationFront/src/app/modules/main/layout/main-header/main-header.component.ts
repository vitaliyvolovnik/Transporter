import {Component, OnInit} from '@angular/core';
import {SecurityService} from "../../../../service/security.service";
import {MessageService} from "primeng/api";
import {AuthHttpService} from "@api/service/auth-http.service";
import {first} from "rxjs";
import {Role} from "@api/models/enums/Role";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@UntilDestroy({checkProperties:true})
@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  IsAdmin:boolean=false;
  IsTransporter:boolean=false;

  constructor(public securityService:SecurityService,
              private messageService:MessageService,
              private authService:AuthHttpService) {
    this.securityService.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe({
      next:()=>{
        this.IsAdmin = this.securityService.hasRole(Role.ADMIN);
        this.IsTransporter = this.securityService.hasRole(Role.TRANSPORTER);
      }
    })

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
      .pipe(first())
      .subscribe({
        next:()=>{
          this.securityService.logout();
          this.messageService.add({severity:'success', summary: 'logout', detail: 'logout successful'});
        }
      })

  }
}
