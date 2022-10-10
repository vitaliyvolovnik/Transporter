import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TabMenuModule} from "primeng/tabmenu";



@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminHeaderComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        ButtonModule,
        RippleModule,
        RouterLink,
        TabMenuModule
    ]
})
export class AdminLayoutModule { }
