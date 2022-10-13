import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataViewModule} from "primeng/dataview";
import {MessageService} from "primeng/api";
import {SecurityService} from "../../../../service/security.service";
import {Role} from "@api/models/enums/Role";
import {OfferHttpService} from "@api/service/offer-http.service";
import {DeliveryHttpService} from "@api/service/delivery-http.service";
import {Offer} from "@api/models/Offer";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, RouterLink, RouterModule} from "@angular/router";
import {first} from "rxjs";


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: Offer[] =[];
  isCustomer =false;

  constructor(private offerService: OfferHttpService,
              private deliveryService: DeliveryHttpService,
              private activatedRoute: ActivatedRoute,
              private messageService:MessageService,
              private securityService:SecurityService) {
    this.securityService.isAuthenticated$
      .pipe()
      .subscribe({
        next:()=>{
          this.isCustomer = this.securityService.hasRole(Role.CUSTOMER);
        }
      })
    this.getOffers();
  }

  ngOnInit(): void {
  }

  private getOffers() {
    if(this.securityService.hasRole(Role.TRANSPORTER)){
      this.offerService.getCurrentTransporterOffer()
        .pipe()
        .subscribe({next:(offers)=>{
            this.offers = offers;
          }})
    }else{
      this.offerService.getDeliveryOffer(this.activatedRoute.snapshot.params['id'])
        .pipe()
        .subscribe({next:(offers)=>{
            this.offers = offers;

          }})
    }

  }

  cancel(offer: Offer) {
    this.offerService.delete(offer.id)
      .pipe(first())
      .subscribe({next:()=>this.getOffers()});

  }
}


@NgModule({
  declarations: [
    OffersComponent
  ],
  imports: [
    RouterModule.forChild([{path:'', component:OffersComponent}]),
    CommonModule,
    DataViewModule,
    ButtonModule,
    RippleModule,
    RouterLink
  ]
})
export class OffersModule { }
