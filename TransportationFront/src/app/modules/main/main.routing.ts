import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout.component";


const routes:Routes=[
  {
    path:"",
    component:MainLayoutComponent,
    children:[
      {path:"",loadChildren:()=>import("./Components/deliveries/deliveries.component").then(m=>m.DeliveriesModule)},
      {path:"login",loadChildren:()=>import("./Components/login/login.component").then(m=>m.LoginModule)},


    ]
  }
 ]

export const routing = RouterModule.forChild(routes)
