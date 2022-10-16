import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RestPage} from "@api/models/RestPage";
import {Pagination} from "@api/models/Pagination";
import {MessageService} from "primeng/api";
import {finalize, first} from "rxjs";
import {Transporter} from "@api/models/Transporter";
import {TransporterHttpService} from "@api/service/transporter-http.service";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {RouterModule} from "@angular/router";
import {AdminHttpService} from "@api/service/admin-http.service";

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.scss']
})
export class TransportersComponent implements OnInit {


  transporters: RestPage<Transporter> = new RestPage<Transporter>();
  isLoading: boolean = false;
  selectedTransporter: Transporter[] = [];
  lastPag!: Pagination;


  constructor(private transporterHttpService: TransporterHttpService,
              private messageService: MessageService,
              private adminService: AdminHttpService) {

  }

  ngOnInit(): void {
  }

  onLazyLoad(event: any) {

    this.lastPag = Pagination.fromPrimeNg(event);
    this.loadData(Pagination.fromPrimeNg(event));
  }

  loadData(pagination: Pagination = new Pagination()) {
    this.isLoading = true;
    this.transporterHttpService.getAll(pagination)
      .pipe(first(), finalize(() => this.isLoading = false))
      .subscribe({
        next: transporter => {
          this.transporters = transporter;
        },
        error: error => console.error(error)
      })
  }

  updateData() {
    this.loadData(this.lastPag)
  }


  blockSelectedTransporters() {
    this.selectedTransporter.forEach((value, index) =>
      this.adminService.blockUser(value.user.id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.updateData()
          }
        }));
  }

  banTransporter(transporter: Transporter) {
    this.adminService.blockUser(transporter.user.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'block',
            detail: `customer ${transporter.companyName} is blocked`
          });
          this.updateData()
        }
      })
  }

  unbanTransporter(transporter: any) {
    this.adminService.unblockUser(transporter.user.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'block',
            detail: `customer ${transporter.companyName} is unblocked`
          });
          this.updateData()
        }

      })
  }

}


@NgModule({
  declarations: [
    TransportersComponent
  ],
  imports: [
    RouterModule.forChild([{path: '', component: TransportersComponent}]),
    CommonModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    RippleModule,
    InputTextModule
  ]
})
export class TransportersModule {
}
