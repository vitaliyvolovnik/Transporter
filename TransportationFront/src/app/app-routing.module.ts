import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AdminGuard} from "./guard/admin.guard";

const routes: Routes = [
  {path: "admin", loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),canActivate:[AdminGuard]},
  {path: "", loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
