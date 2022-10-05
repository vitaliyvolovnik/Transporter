import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {API_URL} from "@config/Constans";
import {Cargo} from "@api/models/cargo";


@Injectable({providedIn:'root'})
export class CargoHttpService {
  private readonly URL =`${API_URL}/cargo`;

  constructor(private httpClient:HttpClient) {
  }

  getAll(){
       return this.httpClient.get<Cargo[]>(this.URL)
  }

}
