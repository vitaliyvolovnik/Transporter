import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Delivery} from "@api/models/Delivery";
import {DeliveryHttpService} from "@api/service/delivery-http.service";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {first} from "rxjs";
import {MessageService} from "primeng/api";
import * as moment from "moment";

import {SecurityService} from "../../../../service/security.service";
import {Role} from "@api/models/enums/Role";

@Component({
  selector: 'app-delivery-create',
  templateUrl: './delivery-create.component.html',
  styleUrls: ['./delivery-create.component.scss']
})
export class DeliveryCreateComponent implements OnInit {

  isTransporter:boolean= false;
  public autoResize: boolean = true;
  formGroup!: FormGroup;
  delivery?: Delivery;
  cargoArr!: FormArray;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private deliveryService: DeliveryHttpService,
              private messageService: MessageService,
              private securityService:SecurityService) {
    this.securityService.isAuthenticated$
      .pipe()
      .subscribe({
        next:()=>{
          this.isTransporter = this.securityService.hasRole(Role.TRANSPORTER);
        }
      })
    this.formInit();


    const deliveryId = activatedRoute.snapshot.params['id'];
    if (deliveryId) {
      this.loadDelivery(deliveryId);
    }
  }

  ngOnInit(): void {
  }

  saveDelivery() {
    let delivery = this.formGroup.value as Delivery;
    if (this.delivery) {
      console.log(1)
      this.updateDelivery({...delivery,id:this.delivery.id});
    } else {
      this.createDelivery(delivery);
    }

  }

  createDelivery(delivery: Delivery) {
    this.deliveryService.create(delivery)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'delivery is created'});
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'cannot create delivery'});
        },
      });
  }

  updateDelivery(delivery: Delivery) {
    this.deliveryService.update(delivery)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'delivery is updated'});
        },
        error: () => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'cannot update delivery'});
        },
      });
  }

  private formInit() {
    this.formGroup = this.formBuilder.group({
      description: [{value: null, disabled: this.isTransporter}, [Validators.required, Validators.max(255)]],
      departureDate: [{value: null, disabled: this.isTransporter}, Validators.required],
      arrivalDate: [{value: null, disabled: this.isTransporter}, Validators.required],
      destinationAddress: this.formBuilder.group({
        country: [{value: null, disabled: this.isTransporter}, Validators.required],
        city: [{value: null, disabled: this.isTransporter}, Validators.required],
        street: [{value: null, disabled: this.isTransporter}, Validators.required],
      }),
      departureAddress: this.formBuilder.group({
        country: [{value: null, disabled: this.isTransporter}, Validators.required],
        city: [{value: null, disabled: this.isTransporter}, Validators.required],
        street: [{value: null, disabled: this.isTransporter}, Validators.required],
      }),
      cargoes: this.formBuilder.array([this.formBuilder.group({
        cargo: [{value: null, disabled: this.isTransporter}, Validators.required],
        weight: [{value: null, disabled: this.isTransporter}, Validators.required],
        unitOfMeasurement: [{value: null, disabled: this.isTransporter}, Validators.required]
      })])
    });
    this.cargoArr = this.formGroup.get('cargoes') as FormArray;
  }

  addCargo() {

    this.cargoArr.push(this.formBuilder.group({
      cargo: [{value: null, disabled: this.isTransporter}, Validators.required],
      weight: [{value: null, disabled: this.isTransporter}, Validators.required],
      unitOfMeasurement: [{value: null, disabled: this.isTransporter}, Validators.required]
    }));
  }

  private loadDelivery(deliveryId: number) {
    this.deliveryService.get(deliveryId)
      .pipe(first())
      .subscribe({
        next: (delivery) => {

          delivery.arrivalDate = moment(delivery.arrivalDate, 'YYYY-MM-DDThh:mm:ss').toDate() as any;
          delivery.departureDate = moment(delivery.departureDate, 'YYYY-MM-DDThh:mm:ss').toDate() as any;


          this.delivery = delivery;

          this.cargoArr.clear();

          delivery.cargoes.forEach(() => this.addCargo());
          this.formGroup.patchValue(delivery);
        }
      })
  }
}

@NgModule({
  declarations: [
    DeliveryCreateComponent
  ],
  imports: [
    RouterModule.forChild([{path: "", component: DeliveryCreateComponent}]),
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    RippleModule
  ]
})
export class DeliveryCreateModule {
}
