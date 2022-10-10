import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import {RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    RippleModule,
    RouterLink,
    RouterLinkActive,
    RouterLinkWithHref
  ]
})
export class MainLayoutModule { }
