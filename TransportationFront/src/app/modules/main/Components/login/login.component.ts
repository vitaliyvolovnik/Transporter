import {Component, NgModule, NgZone, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Credentials} from "@api/models/Credentials";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SecurityService} from "../../../../service/security.service";
import {AuthHttpService} from "@api/service/auth-http.service";
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials:Credentials={
    email:"",
    password:""
  }

  constructor(private messageService:MessageService,
              private router:Router,
              private securityService:SecurityService,
              private authService:AuthHttpService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.credentials)
      .pipe(first())
      .subscribe({
        next:(user)=>{
          this.securityService.login(user);
          this.messageService.add({severity:'success', summary: 'Success', detail: 'authorization successful'});
          },
        error:(err)=>{this.messageService.add({severity:'error', summary: 'Error', detail: 'authenticated failed'});}
      });

  }
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([{path: "", component: LoginComponent}]),
    CommonModule,
    FormsModule,
    RippleModule,
    ButtonModule,
    InputTextModule,
  ],
  providers:[

  ]
})
export class LoginModule { }

