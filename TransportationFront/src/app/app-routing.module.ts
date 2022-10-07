import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {path: "", loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
