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

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  autoResize: boolean = true;
  formGroup!:FormGroup;
  offer?:Offer;
  isTransporter:boolean=true;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private offerService: OfferHttpService,
              private messageService: MessageService,
              private securityService:SecurityService) {

    this.securityService.isAuthenticated$
      .pipe()
      .subscribe({
        next:()=>{
          this.isTransporter = this.securityService.hasRole(Role.TRANSPORTER);
        }
      })
    this.initForm();
    const offerId = activatedRoute.snapshot.params['id'];
    if (offerId) {
      console.log(3)
      this.loadOffer(offerId);
    }
  }

  ngOnInit(): void {
  }

  initForm(){
    this.formGroup = this.formBuilder.group({
      information:[{value: null, disabled: !this.isTransporter},[Validators.required, Validators.max(255)]],
      price:[{value: null, disabled: !this.isTransporter},Validators.required],
    })
  }


  saveOffer() {
    let offer = this.formGroup.value as Offer;
    if(this.offer){
      offer.id = this.offer.id;
      this.update(offer);
    } else{
      this.create(offer);
    }

  }
  create(offer:Offer){
    offer.delivery = {id: this.activatedRoute.snapshot.params['id']} as any;
    this.offerService.create(offer)
      .pipe(first())
      .subscribe({
        next:()=>{
          this.router.navigate(['delivery/item',offer.delivery.id])
            .then(()=> this.messageService.add({severity:'info', summary: 'Info', detail: 'offer is created'}))
        },
        error:(err)=>{
          this.messageService.add({severity:'info', summary: 'Info', detail: 'offer is created'})
        }
      })
  }
  update(offer:Offer){
    this.offerService.update(offer)
      .pipe(first())
      .subscribe({
        next:()=>{
          this.router.navigate(['delivery/item',offer.delivery.id])
            .then(()=> this.messageService.add({severity:'info', summary: 'Info', detail: 'offer is created'}))
        },
        error:(err)=>{
          this.messageService.add({severity:'info', summary: 'Info', detail: 'offer is created'})
        }
      })
  }
  private loadOffer(offerId: any) {
    this.offerService.get(offerId)
      .pipe(first())
      .subscribe({
        next:(offer)=>{
          this.offer = offer;
          this.formGroup.patchValue(offer);
        }
      })
  }
}



@NgModule({
  declarations: [
    OfferComponent
  ],
  imports: [
    RouterModule.forChild([{path:'',component:OfferComponent}]),
    CommonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule
  ]
})
export class OfferModule { }
