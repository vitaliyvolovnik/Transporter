import { Component } from '@angular/core';
import {CargoHttpService} from "@api/service/cargo-http.service";
import {Cargo} from "@api/models/cargo";
import {first} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TransportationFront';

  //cargoes:Cargo[]=[];
  constructor(private cargoHttpService:CargoHttpService) {
    //this.getCargoes();
  }


  /*getCargoes(){
    this.cargoHttpService.getAll()
      .pipe(first())
      .subscribe({
        next:(cargo)=>{this.cargoes= cargo},
        error:error=>console.log(error.statusCode)
      });
  }*/


}
