import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../../../service/security.service";
import {MessageService} from "primeng/api";
import {AuthHttpService} from "@api/service/auth-http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(public securityService: SecurityService,
              private messageService: MessageService,
              private authService: AuthHttpService) {

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
      .pipe(first())
      .subscribe({
        next: () => {
          this.securityService.logout();
          this.messageService.add({severity: 'success', summary: 'logout', detail: 'logout successful'});
        }
      })

  }
}
