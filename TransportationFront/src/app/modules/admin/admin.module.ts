import { NgModule } from '@angular/core';
import {routing} from "./admin.routing";
import {AdminLayoutModule} from "./layout/admin-layout.module";



@NgModule({
  declarations: [],
  imports: [
    routing,
    AdminLayoutModule
  ]
})
export class AdminModule { }
