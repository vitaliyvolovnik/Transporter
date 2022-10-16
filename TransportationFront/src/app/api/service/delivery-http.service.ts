import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "@config/Constans";
import {Observable} from "rxjs";
import {Delivery} from "@api/models/Delivery";

@Injectable({providedIn:'root'})
export class DeliveryHttpService{
  private readonly URL = `${API_URL}/delivery`;

  constructor(private httpClient:HttpClient){
  }


  public getAll():Observable<Delivery[]>{
    return this.httpClient.get<Delivery[]>(`${this.URL}`);
  }
  public get(id:number):Observable<Delivery>{
    return this.httpClient.get<Delivery>(`${this.URL}/${id}`);

  }
  public create(delivery:Delivery){
    return this.httpClient.post(`${this.URL}`,delivery);
  }
  public cancelDelivery(id:number){
    return this.httpClient.get(`${this.URL}/cancel/${id}`);
  }
  public update(delivery:Delivery){
    return this.httpClient.put(`${this.URL}/${delivery.id}`,delivery);
  }
  public getCurrent(){
    return this.httpClient.get<Delivery[]>(`${this.URL}/current`);
  }
  public acceptOffer(deliveryId:number,offerId:number){
    return this.httpClient.put(`${this.URL}/${deliveryId}/${offerId}`,null);
  }
}
