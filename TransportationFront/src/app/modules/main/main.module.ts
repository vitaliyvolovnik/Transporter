import { NgModule } from '@angular/core';
import {routing} from './main.routing'
import {MainLayoutModule} from "./layout/main-layout.module";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [],
  imports: [
    routing,
    MainLayoutModule,
    ToastModule
  ]
})
export class MainModule { }


