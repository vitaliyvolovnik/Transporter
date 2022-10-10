import {Injectable} from "@angular/core";
import * as Http from "http";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "@config/Constans";
import {Observable} from "rxjs";
import {Delivery} from "@api/models/Delivery";

@Injectable({providedIn:'root'})
export class DeliveryHttpService{
  private readonly URL = `${API_URL}/delivery`

  constructor(private httpClient:HttpClient){
  }


  public getAll():Observable<Delivery[]>{
    return this.httpClient.get<Delivery[]>(`${this.URL}`);
  }
}
