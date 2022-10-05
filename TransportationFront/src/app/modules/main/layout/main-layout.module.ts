import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MainHeaderComponent } from './main-header/main-header.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    MainHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainLayoutModule { }
