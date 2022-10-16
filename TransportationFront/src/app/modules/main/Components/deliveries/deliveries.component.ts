import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DataViewModule} from "primeng/dataview";
import {Delivery} from "@api/models/Delivery";
import {DeliveryHttpService} from "@api/service/delivery-http.service";
import {MessageService} from "primeng/api";
import {first} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {SecurityService} from "../../../../service/security.service";
import {Role} from "@api/models/enums/Role";
import {DeliveryState} from "@api/models/enums/DeliveryState";
import {CustomerHttpService} from "@api/service/customer-http.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy({checkProperties:true})
@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  readonly ACCEPTED = DeliveryState.OFFER_ACCEPTED;
  isCustomer:boolean=false;
  deliveries!: Delivery[];


  constructor(private deliveryService: DeliveryHttpService,
              private customerService: CustomerHttpService,
              private messageService:MessageService,
              private securityService:SecurityService) {
    this.securityService.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe({
        next:()=>{
          this.isCustomer = this.securityService.hasRole(Role.CUSTOMER);
        }
      })
    this.getDeliveries();
  }

  ngOnInit() {
  }
  private getDeliveries(){
    if(this.securityService.hasRole(Role.CUSTOMER)){
      this.deliveryService.getCurrent()
        .pipe(first())
        .subscribe({
          next:(deliveries)=>{this.deliveries=deliveries;}
        })
    }else{
      this.deliveryService.getAll()
        .pipe(first())
        .subscribe({
          next:(deliveries)=>{this.deliveries=deliveries;}
        })
    }
  }


  cancel(delivery: Delivery) {
    this.deliveryService.cancelDelivery(delivery.id)
      .pipe(first())
      .subscribe({next:()=>{
          this.getDeliveries();
        }});
  }
}

@NgModule({
  declarations: [
    DeliveriesComponent
  ],
    imports: [
        RouterModule.forChild([{path: "", component: DeliveriesComponent}]),
        CommonModule,
        DataViewModule,
        DropdownModule,
        FormsModule,
        RatingModule,
        ButtonModule,
        InputTextModule,
        RippleModule
    ]
})
export class DeliveriesModule { }

