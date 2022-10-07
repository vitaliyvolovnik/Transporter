import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from "./layout/admin-layout.component";


const routes:Routes=[
  {
    path:"",
    component:AdminLayoutComponent,
    children:[
      {path:"",pathMatch:"full",redirectTo:"customers"},
      {path:"customers",loadChildren:()=>import("./Components/customers/customers.component").then(m=>m.CustomersModule)}

    ]
  }
]

export const routing = RouterModule.forChild(routes)
