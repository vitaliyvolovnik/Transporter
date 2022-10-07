import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CustomersModule { }

