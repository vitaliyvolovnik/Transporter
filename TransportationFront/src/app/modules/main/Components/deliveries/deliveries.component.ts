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

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  readonly ACCEPTED = DeliveryState.OFFER_ACCEPTED;
  isCustomer:boolean=false;
  deliveries!: Delivery[];

  /*sortOptions: SelectItem[] = [
    {label: 'id High to Low', value: '!id'},
    {label: 'id Low to High', value: 'id'}
  ];
  sortKey: string = this.sortOptions[0].value
  sortField: string = 'id';
  sortOrder: number = 1;
*/

  constructor(private deliveryService: DeliveryHttpService,
              private customerService: CustomerHttpService,
              private messageService:MessageService,
              private securityService:SecurityService) {
    this.securityService.isAuthenticated$
      .pipe()
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

  onSortChange(event:any) {
    let value = event.value;
  }

  edit(delivery: Delivery) {
    this.messageService.add({severity:'warn', summary: 'Success', detail: `editing delivery with id${delivery.id}`});

  }

  cancel(delivery: Delivery) {
    this.messageService.add({severity:'error', summary: 'Error', detail: `delivery with id${delivery.id} is canceled`});
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

