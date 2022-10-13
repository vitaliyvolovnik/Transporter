import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout.component";


const routes:Routes=[
  {
    path:"",
    component:MainLayoutComponent,
    children:[
      {path:"",redirectTo:"deliveries",pathMatch:'full'},
      {path:"deliveries",loadChildren:()=>import("./Components/deliveries/deliveries.component").then(m=>m.DeliveriesModule)},
      {path:"delivery/item",loadChildren:()=>import("./Components/delivery/delivery-create.component").then(m=>m.DeliveryCreateModule)},
      {path:"delivery/item/:id",loadChildren:()=>import("./Components/delivery/delivery-create.component").then(m=>m.DeliveryCreateModule)},
      {path:"offer/item/update/:offerId",loadChildren:()=>import("./Components/offer/offer.component").then(m=>m.OfferModule)},
      {path:"offer/item/create/:deliveryId",loadChildren:()=>import("./Components/offer/offer.component").then(m=>m.OfferModule)},
      {path:"offers",loadChildren:()=>import("./Components/offers/offers.component").then(m=>m.OffersModule)},
      {path:"offers/:id",loadChildren:()=>import("./Components/offers/offers.component").then(m=>m.OffersModule)},
      {path:"login",loadChildren:()=>import("./Components/login/login.component").then(m=>m.LoginModule)},


    ]
  }
 ]

export const routing = RouterModule.forChild(routes)
