import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CustomerHttpService} from "@api/service/customer-http.service";
import {finalize, first} from "rxjs";
import {Customer} from "@api/models/Customer";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {FileUploadModule} from "primeng/fileupload";
import {ToolbarModule} from "primeng/toolbar";
import {RestPage} from "@api/models/RestPage";
import {Pagination} from "@api/models/Pagination";
import {Router, RouterModule} from "@angular/router";
import {RippleModule} from "primeng/ripple";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from "primeng/api";
import {AdminHttpService} from "@api/service/admin-http.service";


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  customers: RestPage<Customer> = new RestPage<Customer>();
  isLoading: boolean = false;
  selectedCustomers: Customer[] = [];
  lastPag!: Pagination;


  constructor(private customerHttpService: CustomerHttpService,
              private messageService: MessageService,
              private adminService:AdminHttpService) {

  }

  ngOnInit(): void {
  }

  onLazyLoad(event: any) {

    this.lastPag = Pagination.fromPrimeNg(event);
    this.loadData(Pagination.fromPrimeNg(event));
  }

  loadData(pagination: Pagination = new Pagination()) {
    this.isLoading = true;
    this.customerHttpService.getAll(pagination)
      .pipe(first(), finalize(() => this.isLoading = false))
      .subscribe({
        next: customers => {
          this.customers = customers;
        },
        error: error => console.error(error)
      })
  }

  updateData() {
    this.loadData(this.lastPag)
  }


  blockSelectedCustomers() {
    this.selectedCustomers.forEach((value, index) => {
      this.adminService.blockUser(value.user.id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.updateData()
          }
        })
    });
  }

  banCustomer(customer: Customer) {
    this.adminService.blockUser(customer.user.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'block', detail: `customer ${customer.firstname+ ' ' +customer.lastname} is blocked`});
          this.updateData()
        }
      })
  }

  unbanCustomer(customer: any) {
    this.adminService.unblockUser(customer.user.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({severity: 'success', summary: 'block', detail: `customer ${customer.firstname+ ' ' +customer.lastname} is unblocked`});
          this.updateData()
        }

      })
  }
}


@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    RouterModule.forChild([{path: "", component: CustomersComponent}]),
    CommonModule,
    TableModule,
    ButtonModule,
    FileUploadModule,
    ToolbarModule,
    RippleModule,
    RadioButtonModule,
    InputNumberModule,
    InputTextModule
  ]
})
export class CustomersModule {
}

