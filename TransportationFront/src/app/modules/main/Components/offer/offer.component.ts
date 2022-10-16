import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {MessageService} from "primeng/api";
import {SecurityService} from "../../../../service/security.service";
import {OfferHttpService} from "@api/service/offer-http.service";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Offer} from "@api/models/Offer";
import {first} from "rxjs";
import {Role} from "@api/models/enums/Role";
import {DeliveryHttpService} from "@api/service/delivery-http.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy({checkProperties:true})
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  autoResize: boolean = true;
  formGroup!: FormGroup;
  offer?: Offer;
  isTransporter: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private offerService: OfferHttpService,
              private messageService: MessageService,
              private securityService: SecurityService,
              private deliveryService: DeliveryHttpService) {

    this.securityService.isAuthenticated$
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.isTransporter = this.securityService.hasRole(Role.TRANSPORTER);
        }
      })
    this.initForm();
    const offerId = activatedRoute.snapshot.params['offerId'];
    if (offerId) {
      this.loadOffer(offerId);
    }
  }

  ngOnInit(): void {
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      information: [{value: null, disabled: !this.isTransporter}, [Validators.required, Validators.max(255)]],
      price: [{value: null, disabled: !this.isTransporter}, Validators.required],
    })
  }


  saveOffer() {
    let offer = this.formGroup.value as Offer;
    if (this.offer) {
      offer.id = this.offer.id;
      this.update(offer);
    } else {
      this.create(offer);
    }

  }

  create(offer: Offer) {

    offer.delivery = {id: this.activatedRoute.snapshot.params['deliveryId']} as any;
    this.offerService.create(offer)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['delivery/item', offer.delivery.id])
            .then(() => this.messageService.add({severity: 'info', summary: 'Info', detail: 'offer is created'}))
        },
        error: () => {
          this.messageService.add({severity: 'info', summary: 'Info', detail: 'offer creation error'})
        }
      })
  }

  update(offer: Offer) {
    this.offerService.update(offer)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['delivery/item', offer.delivery.id])
            .then(() => this.messageService.add({severity: 'info', summary: 'Info', detail: 'offer is created'}))
        },
        error: () => {
          this.messageService.add({severity: 'info', summary: 'Info', detail: 'offer updating error'})
        }
      })
  }

  private loadOffer(offerId: any) {
    this.offerService.get(offerId)
      .pipe(first())
      .subscribe({
        next: (offer) => {
          this.offer = offer;
          this.formGroup.patchValue(offer);
        }
      })
  }

  acceptOffer() {
    if (this.offer?.delivery?.id && this.offer?.id)
      this.deliveryService.acceptOffer(this.offer?.delivery?.id, this.offer?.id)
        .pipe(first())
        .subscribe({
          next:()=>{
            this.router.navigate(['/'])
            this.messageService.add({severity:'info', summary: 'Info', detail: 'offer is accepted'});
          },
          error:()=>{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'cannot accept offer'});
          }

        })
  }
}


@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: OfferComponent}]),
    CommonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ]
})
export class OfferModule {
}
