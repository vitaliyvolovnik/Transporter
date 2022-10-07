import {Component, NgModule, NgZone, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {Credentials} from "@api/models/credentials";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";

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
              private router:Router) {
  }

  ngOnInit(): void {
  }

  login() {


    this.router.navigate(['/'])
      .then(()=>this.messageService.add({severity:'success', summary: 'Success', detail: `user ${this.credentials.email}  logined`}))
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

