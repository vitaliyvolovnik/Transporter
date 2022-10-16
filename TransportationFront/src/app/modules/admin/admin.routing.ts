import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./layout/admin-layout.component";


const routes:Routes=[
  {
    path:"",
    component:AdminLayoutComponent,
    children:[
      {path:"",pathMatch:"full",redirectTo:"customers"},
      {path:"customers",loadChildren:()=>import("./Components/customers/customers.component").then(m=>m.CustomersModule)},
      {path:"transporters",loadChildren:()=>import("./Components/transporters/transporters.component").then(m=>m.TransportersModule)}

    ]
  }
]

export const routing = RouterModule.forChild(routes)
