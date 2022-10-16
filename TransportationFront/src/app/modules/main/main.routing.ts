import {RouterModule, Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout.component";
import {NotAuthenticatedGuard} from "../../guard/not-authenticated.guard";
import {AuthenticatedGuard} from "../../guard/authenticated.guard";


const routes:Routes=[
  {
    path:"",
    component:MainLayoutComponent,
    children:[
      {path:"",redirectTo:"deliveries",pathMatch:'full'},
      {path:"deliveries",loadChildren:()=>import("./Components/deliveries/deliveries.component").then(m=>m.DeliveriesModule)},
      {path:"delivery/item",loadChildren:()=>import("./Components/delivery/delivery-create.component").then(m=>m.DeliveryCreateModule),canActivate:[AuthenticatedGuard]},
      {path:"delivery/item/:id",loadChildren:()=>import("./Components/delivery/delivery-create.component").then(m=>m.DeliveryCreateModule),canActivate:[AuthenticatedGuard]},
      {path:"offer/item/update/:offerId",loadChildren:()=>import("./Components/offer/offer.component").then(m=>m.OfferModule),canActivate:[AuthenticatedGuard]},
      {path:"offer/item/create/:deliveryId",loadChildren:()=>import("./Components/offer/offer.component").then(m=>m.OfferModule),canActivate:[AuthenticatedGuard]},
      {path:"offers",loadChildren:()=>import("./Components/offers/offers.component").then(m=>m.OffersModule),canActivate:[AuthenticatedGuard]},
      {path:"offers/:id",loadChildren:()=>import("./Components/offers/offers.component").then(m=>m.OffersModule),canActivate:[AuthenticatedGuard]},
      {path:"login",loadChildren:()=>import("./Components/login/login.component").then(m=>m.LoginModule),canActivate:[NotAuthenticatedGuard]},


    ]
  }
 ]

export const routing = RouterModule.forChild(routes)
