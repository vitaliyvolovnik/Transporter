import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {SecurityInterceptor} from "./interceptors/security.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    RouterOutlet,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
